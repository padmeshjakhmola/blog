import { db } from "@/database/drizzle";
import { comments, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const response = await db.select({

    // })

    const body = await req.json();

    const { blogId, loggedInUser, commentText } = body;

    if (!body) {
      return NextResponse.json(
        {
          message: "No comment added",
        },
        { status: 400 }
      );
    }

    // try {

    // } catch (error) {
    //   console.error("DB_error", error);
    //   return NextResponse.json(
    //     { error: "Failed to update database" },
    //     { status: 500 }
    //   );
    // }

    // ALL THE /comments: {
    //     blogId: '19710665-15ae-4527-b5ea-7590183b5a96',
    //     loggedInUser: '05d178fa-256d-435e-9a7b-fea0bf0d4df0',
    //     commentText: 'sd'
    //   }

    const inserted = await db
      .insert(comments)
      .values({
        blogId,
        userId: loggedInUser,
        comment: commentText,
      })
      .returning();

    const insertComment = inserted[0];

    const commentWithUser = await db
      .select({
        id: comments.id,
        comment: comments.comment,
        createdAt: comments.createdAt,
        user: {
          fullName: users.fullName,
          profileImage: users.profileImage,
        },
      })
      .from(comments)
      .where(eq(comments.id, insertComment.id))
      .leftJoin(users, eq(comments.userId, users.id));

    return NextResponse.json(
      {
        message: "Comment created successfully",
        values: commentWithUser[0],
        // comment: newComment, // if inserting to DB
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
