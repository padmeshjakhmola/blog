import config from "@/lib/config";
import s3 from "@/utils/aws";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { blogs } from "@/database/schema";
import { uniqueFileName } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // console.log("formData:", formData, typeof formData);

    const name = formData.get("name") as string | null;
    const author = formData.get("author") as string | null;
    const description = formData.get("description") as string | null;
    const image = formData.get("image") as File | null;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and Description are required" },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (
      !author ||
      typeof author !== "string" ||
      !author.match(/^[0-9a-fA-F-]{36}$/)
    ) {
      return NextResponse.json(
        { error: "Valid UUID author ID is required" },
        { status: 400 }
      );
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

    try {
      await db.insert(blogs).values({
        author: author,
        blogName: name,
        blogDescription: description,
        blogImage: uniqueFileNameforfetchingImage,
      });
    } catch (error) {
      console.error("Error updating database:", error);
      return NextResponse.json(
        { error: "Failed to update database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "files_uploaded_successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error_uploading_files:", error);
    return NextResponse.json(
      { error: "Failed to process upload", details: (error as Error).message },
      { status: 500 }
    );
  }
}
