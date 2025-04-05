"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const insertedUsers = await db
    .insert(users)
    .values({
      fullName,
      email,
      password: hashPassword,
    })
    .returning({ id: users.id });

  const user = insertedUsers[0];

  if (!user) throw new Error("Unable to add user");

  const token = verifyJwt({
    id: user.id,
  });

  if (token)
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
      const { id, fullName, email } = user[0];
      return { id, name: fullName, email };
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
