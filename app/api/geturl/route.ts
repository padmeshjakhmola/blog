import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import config from "@/lib/config";
import { signedUrl } from "@/lib/actions/sign";
import { blogs } from "@/database/schema";

export async function GET() {
  const response = await db.select().from(blogs);

  const blogUrls = await Promise.all(
    response.map(async (blog) => {
      const getObjectParamsofImage = {
        Bucket: config.env.awsBucketname,
        Key: blog.blogImage,
      };

      const [imageUrl] = await Promise.all([signedUrl(getObjectParamsofImage)]);

      return {
        id: blog.id,
        imageUrl,
        author: blog.author,
        name: blog.blogName,
        description: blog.blogDescription,
      };
    })
  );

  return NextResponse.json(blogUrls);
}
