import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import config from "@/lib/config";
import { deleteBlog } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { status: 401, message: "Unauthorized: No token found" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, config.env.jwtToken) as { id: string };
    const { blogId } = await req.json();

    const result = await deleteBlog(blogId, decoded.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to delete" },
      { status: 500 }
    );
  }
}
