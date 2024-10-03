import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { getToken } from "next-auth/jwt";
import {
  FormattedForum,
  PostFeedsRequest,
  ForumResponse,
  ForumComment,
} from "@/app/utils/PostFeeds";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
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
      JSON.stringify({ data: formattedForums, message: "success get forum" }),
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

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const { image, title, description, tags } = body as PostFeedsRequest;

  if (!description || !title) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    await client.forum.create({
      data: {
        image: image,
        title: title,
        description: description,
        creator_id: token?.id?.toString() || "",
        // creator_id: "1",
        tag: tags,
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
        message: "Success create forum",
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
