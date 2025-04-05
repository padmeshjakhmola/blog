"use server";

import { db } from "@/database/drizzle";
import { blogs, users } from "@/database/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { uniqueFileName } from "@/constants";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import s3 from "@/utils/aws";
import { signedUrl } from "./sign";

interface UserPayload {
  id: string;
}

const verifyJwt = (checkUser: UserPayload) => {
  const token = jwt.sign(checkUser, config.env.jwtToken);
  return token;
};

export const createAccount = async ({
  fullName,
  email,
  password,
  image,
}: {
  fullName: string;
  email: string;
  password: string;
  image: File | null;
}) => {
  if (!image) {
    return {
      status: 400,
      message: "Imaage required",
    };
  }

  const imageBuffer = image
    ? Buffer.from(await image.arrayBuffer())
    : undefined;

  const uniqueFileNameforfetchingImage = uniqueFileName();
  const imageParams: AWSFILEUPLOAD = {
    Bucket: config.env.awsBucketname,
    Key: uniqueFileNameforfetchingImage,
    Body: imageBuffer,
    ContentType: image.type || "image/jpeg",
    // ACL: "public-read",
  };

  const imageupload_command = new PutObjectCommand(
    imageParams as PutObjectCommandInput
  );

  await Promise.all([s3.send(imageupload_command)]);

  const hashPassword = await bcrypt.hash(password, 10);
  const insertedUsers = await db
    .insert(users)
    .values({
      fullName,
      email,
      password: hashPassword,
      profileImage: uniqueFileNameforfetchingImage,
    })
    .returning({ id: users.id });

  const user = insertedUsers[0];

  if (!user) throw new Error("Unable to add user");

  const token = verifyJwt({
    id: user.id,
  });

  if (!token) return null;

  const cookieStore = cookies();
  (await cookieStore).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    status: 200,
    message: "User logged in successfully",
  };
};

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const searchUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!searchUser[0])
    return {
      id: null,
      error: "User not found. Sign Up?",
    };

  const checkUser = searchUser[0];

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);

  if (isPasswordValid) {
    const token = verifyJwt({
      id: checkUser.id,
    });

    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      status: 200,
      message: "User logged in successfully",
    };
  }
};

export const getCurrentUser = async () => {
  const cookieStore = cookies();

  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, config.env.jwtToken) as { id: string };

    const user = await db.select().from(users).where(eq(users.id, decoded.id));
    // return user[0] || null;

    if (user.length > 0) {
      const { id, fullName, email, profileImage } = user[0];

      const getObjectParamsofImage = {
        Bucket: config.env.awsBucketname,
        Key: profileImage,
      };

      const signUrlImage = await signedUrl(getObjectParamsofImage);

      return { id, name: fullName, email, profileImage: signUrlImage };
    }
    return null;
  } catch {
    return null;
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  (await cookieStore).set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  redirect("/");
};

export const deleteBlog = async (blogId: string, userId: string) => {
  const blog = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.id, blogId), eq(blogs.author, userId)))
    .limit(1);

  if (!blog[0]) {
    return {
      status: 404,
      message: "You don't have permission to delete it.",
    };
  }

  const blogToDelete = blog[0];

  const deleteCommand = new DeleteObjectCommand({
    Bucket: config.env.awsBucketname,
    Key: blogToDelete.blogImage,
  });

  await s3.send(deleteCommand);

  await db.delete(blogs).where(eq(blogs.id, blogId));

  return {
    status: 200,
    message: "Blog deleted successfully",
  };
};
