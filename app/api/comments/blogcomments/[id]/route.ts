import { db } from "@/database/drizzle";
import { comments, users } from "@/database/schema";
import { signedUrl } from "@/lib/actions/sign";
import config from "@/lib/config";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // { params }: { params: { id: string } }
  const resolveParams = await params;
  const { id } = resolveParams;
  // const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID Required" }, { status: 500 });
  }

  try {
    // const getData = await db
    //   .select()
    //   .from(comments)
    //   .where(eq(comments.blogId, id));

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
      .where(eq(comments.blogId, id))
      .leftJoin(users, eq(comments.userId, users.id));

    // !TODO: Need to be fixed can cannotr use signUrl for profile photo everytime

    const signProfileImage = await Promise.all(
      commentWithUser.map(async (item) => {
        const signedImage = item.user?.profileImage
          ? await signedUrl({
              Bucket: config.env.awsBucketname,

              Key: item.user?.profileImage,
            })
          : null;

        return {
          ...item,
          user: {
            ...item.user,
            profileImage: signedImage,
          },
        };
      })
    );

    return NextResponse.json(signProfileImage, { status: 200 });
  } catch (error) {
    console.error("error_get_db", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
