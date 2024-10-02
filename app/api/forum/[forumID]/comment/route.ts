import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { getToken } from "next-auth/jwt";

interface Params {
  forumID: string;
}

export async function POST(
  req: NextRequest,
  { params: { forumID } }: { params: Params }
) {
  if (!forumID) {
    return new NextResponse(
      JSON.stringify({ message: "Forum Id Not Provided " }),
      {
        status: 400,
      }
    );
  }
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const { content } = body;

  if (!content) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const forumComment = await client.forumComment.create({
      data: {
        creator_id: token?.id?.toString() || "",
        forum_id: forumID,
        content: content,
        coin: 0,
      },
    });
    return new NextResponse(
      JSON.stringify({
        data: forumComment,
        message: "success update create comment",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Session Retrieval Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
