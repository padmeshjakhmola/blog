import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import config from "@/lib/config";
import { signedUrl } from "@/lib/actions/sign";
import { blogs, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const response = await db
    .select({
      id: blogs.id,
      imageUrl: blogs.blogImage,
      blogName: blogs.blogName,
      blogDescription: blogs.blogDescription,
      createdAt: blogs.createdAt,
      authorName: users.fullName,
      profileImage: users.profileImage,
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.author, users.id));

  const blogUrls = await Promise.all(
    response.map(async (blog) => {
      if (!blog.imageUrl || !blog.profileImage) return null;

      const getObjectParamsofImage = {
        Bucket: config.env.awsBucketname,
        Key: blog.imageUrl,
      };

      const getObjectParamsofProfileImage = {
        Bucket: config.env.awsBucketname,
        Key: blog.profileImage,
      };

      const [imageUrl, profileUrl] = await Promise.all([
        signedUrl(getObjectParamsofImage),
        signedUrl(getObjectParamsofProfileImage),
      ]);

      return {
        id: blog.id,
        imageUrl,
        name: blog.blogName,
        description: blog.blogDescription,
        author: blog.authorName,
        profileImage: profileUrl,
        createdAt: blog.createdAt,
      };
    })
  );

  return NextResponse.json(blogUrls);
}
