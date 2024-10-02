import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { getToken } from "next-auth/jwt";
import {
  FormattedForum,
  ForumComment,
  ForumResponse,
} from "@/app/utils/PostFeeds";

interface Params {
  forumID: string;
}

export async function POST(
  req: NextRequest,
  { params: { forumID } }: { params: Params },
) {
  if (!forumID) {
    return new NextResponse(
      JSON.stringify({ message: "Forum Id Not Provided " }),
      {
        status: 400,
      },
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
      { status: 400 },
    );
  }

  try {
    await client.forumComment.create({
      data: {
        creator_id: token?.id?.toString() || "",
        // creator_id: "1",
        forum_id: forumID,
        content: content,
        coin: 0,
      },
    });

    const forums = await client.forum.findMany({
      include: {
        user: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
        ForumComment: {
          include: {
            user: {
              select: {
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });

    const formattedForums: FormattedForum[] = forums
      .map((forum: ForumResponse) => ({
        id: forum.id,
        date: forum.created_at.toISOString().split("T")[0],
        avatarSrc: forum.user?.image || "default-avatar.png",
        authorName: forum.user?.name || "Unknown Author",
        username: forum.user?.username || "Unknown Username",
        title: forum.title,
        content: forum.description,
        tags: forum.tag,
        comments: forum.ForumComment.map((comment: ForumComment) => ({
          author: comment.user?.name || "Anonymous",
          authorAvatar: comment.user?.image || "",
          username: comment.user?.username || "Unknown",
          content: comment.content,
        })),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return new NextResponse(
      JSON.stringify({
        data: formattedForums,
        message: "success update create comment",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Session Retrieval Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
