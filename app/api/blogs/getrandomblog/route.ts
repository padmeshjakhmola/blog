import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { blogs, users } from "@/database/schema";
import { signedUrl } from "@/lib/actions/sign";
import config from "@/lib/config";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Get all blogs
    const allBlogs = await db
      .select({
        id: blogs.id,
        blogName: blogs.blogName,
        blogDescription: blogs.blogDescription,
        blogImage: blogs.blogImage,
        createdAt: blogs.createdAt,
        authorId: blogs.author,
        authorName: users.fullName,
      })
      .from(blogs)
      .leftJoin(users, eq(blogs.author, users.id));

    if (allBlogs.length === 0) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 });
    }

    // Pick a random blog
    const randomIndex = Math.floor(Math.random() * allBlogs.length);
    const randomBlog = allBlogs[randomIndex];

    // Sign blog image
    const imageSignedUrl = await signedUrl({
      Bucket: config.env.awsBucketname,
      Key: randomBlog.blogImage,
    });

    const formatted = {
      id: randomBlog.id,
      authorId: randomBlog.authorId,
      blogName: randomBlog.blogName ?? "Untitled Blog",
      author: randomBlog.authorName ?? "Anonymous",
      blogDescription:
        randomBlog.blogDescription ?? "No description available.",
      createdAt: randomBlog.createdAt
        ? new Date(randomBlog.createdAt).toLocaleDateString()
        : "Unknown Date",
      blogImage: imageSignedUrl,
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching random blog:", error);
    return NextResponse.json(
      { message: "Error fetching random blog" },
      { status: 500 }
    );
  }
}
