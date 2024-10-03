import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { PostCrowdFundingBasicRequest } from "@/app/utils/PostCrowdFunding";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getServerSession(options);
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const { title } = body;

  if (!title) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  console.log(token);
  try {
    const created = await client.crowdfunding.create({
      data: {
        name: title,
        status: 0,
        seeker_id: token?.user?.id || "",
        address_line: "",
        amount: 0,
        end_date: new Date().toISOString(),
        start_date: new Date().toISOString(),
        media: "",
        target_amount: 0,
        address_url: "",
      },
    });

    return new NextResponse(
      JSON.stringify({
        data: { id: created.id },
        message: "Success create crowdfunding",
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

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
        status: 401,
      });
    }

    const crowdfunding = await client.crowdfunding.findFirst({
      where: {
        status: {
          lte: 4,
        },
        seeker_id: session.user.id,
      },
    });

    if (!crowdfunding) {
      return new NextResponse(
        JSON.stringify({ message: "Funding data not found" }),
        { status: 404 },
      );
    }

    return new NextResponse(
      JSON.stringify({
        data: { id: crowdfunding.id, status: crowdfunding.status },
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
