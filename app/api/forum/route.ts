import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

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
              },
            },
          },
        },
      },
    });

    // Formatting the result
    const formattedForums = forums.map((forum) => ({
      date: forum.created_at.toISOString().split("T")[0],
      avatarSrc: forum.user?.image || "default-avatar.png",
      authorName: forum.user?.name || "Unknown Author",
      username: forum.user?.username || "Unknown Username",
      title: forum.title,
      content: forum.description,
      tags: forum.tag,
      comments: forum.ForumComment.map((comment) => ({
        author: comment.user?.name || "Anonymous",
        username: comment.user?.username || "Unknown",
        content: comment.content,
      })),
    }));
    return new NextResponse(
      JSON.stringify({ data: formattedForums, message: "success get profile" }),
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
export async function POST(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const { image, title, description, tag } = body as {
    image: string | null;
    title: string;
    description: string;
    tag: string[];
  };

  if (!description || !title) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const user = await client.forum.create({
      data: {
        image: image,
        title: title,
        description: description,
        creator_id: token?.id?.toString() || "",
        coin: 0,
      },
    });
    return new NextResponse(
      JSON.stringify({ data: null, message: "Success create forum" }),
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
