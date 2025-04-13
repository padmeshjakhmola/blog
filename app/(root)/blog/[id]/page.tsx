import React from "react";
import Blog from "@/components/Blog";
import { db } from "@/database/drizzle";
import { blogs, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { signedUrl } from "@/lib/actions/sign";
import config from "@/lib/config";
import { getCurrentUser } from "@/lib/actions/user.actions";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await getCurrentUser();

  const id = (await params).id;

  const [blogDetails] = await db
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
    .leftJoin(users, eq(blogs.author, users.id))
    .where(eq(blogs.id, id))
    .limit(1);

  if (!blogDetails) redirect("/404");

  const getObjectParamsofImage = {
    Bucket: config.env.awsBucketname,
    Key: blogDetails?.blogImage,
  };

  const signUrlImage = await signedUrl(getObjectParamsofImage);

  const loggedInUser = user?.id ?? "";

  console.log("aaaaaaaaaaaaaaaaa", blogDetails);
  

  const formattedBlogDetails = {
    // ...blogDetails,
    id,
    authorId: blogDetails.authorId,
    loggedInUser: loggedInUser,
    blogName: blogDetails.blogName ?? "Untitled Blog",
    author: blogDetails.authorName ?? "Anonymous",
    blogDescription: blogDetails.blogDescription ?? "No description available.",
    createdAt: blogDetails.createdAt
      ? new Date(blogDetails.createdAt).toLocaleDateString()
      : "Unknown Date",
    blogImage: signUrlImage,
  };

  return (
    <div className="py-4 pb-16">
      <div className="hidden">Blog Id is:</div>
      <Blog {...formattedBlogDetails} />
    </div>
  );
};

export default Page;
