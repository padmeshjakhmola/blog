import React from "react";
import Blog from "@/components/Blog";
import { db } from "@/database/drizzle";
import { blogs } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [blogDetails] = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, id))
    .limit(1);

  if (!blogDetails) redirect("/404");

  const formattedBlogDetails = {
    ...blogDetails,
    blogName: blogDetails.blogName ?? "Untitled Blog",
    author: blogDetails.author ?? "Anonymous",
    blogDescription: blogDetails.blogDescription ?? "No description available.",
    createdAt: blogDetails.createdAt
      ? new Date(blogDetails.createdAt).toLocaleDateString()
      : "Unknown Date",
  };

  return (
    <div className="pt-4">
      <div className="hidden">Blog Id is:</div>
      <Blog {...formattedBlogDetails} />
    </div>
  );
};

export default Page;
