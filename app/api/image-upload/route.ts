import config from "@/lib/config";
import s3 from "@/utils/aws";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/database/drizzle";
import { blogs } from "@/database/schema";

export async function POST(req: NextRequest) {
  const uniqueFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
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
        // author: name,
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
