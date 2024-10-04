import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const session = await getServerSession(options);
  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
      status: 401,
    });
  }

  try {
    const user = await client.userAccount.findUnique({
      where: {
        id: session?.user?.id.toString() || "",
      },
      select: {
        id: true,
        created_at: true,
        email: true,
        phone_number: true,
        username: true,
        name: true,
        role: true,
        image: true,
        Business: true,
        UserBillingAddress: {
          select: {
            id: true,
            created_at: true,
            name: true,
            company_name: true,
            address_line: true,
            country: true,
            state_province: true,
            zip_code: true,
            email: true,
            phone_number: true,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({ data: user, message: "success get profile" }),
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
  const session = await getServerSession(options);
  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
      status: 401,
    });
  }

  const body = await req.json();
  const { name, email, phone_number, image } = body;

  if (!name || !email || !phone_number) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    await client.userAccount.update({
      where: {
        id: session?.user?.id.toString() || "",
      },
      data: {
        name: name,
        image: image,
        email: email,
        phone_number: phone_number,
      },
    });
    return new NextResponse(
      JSON.stringify({ data: null, message: "success update profile" }),
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
