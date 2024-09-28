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
    const user = await client.userAccount.findUnique({
      where: {
        id: token?.id,
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
        Business: true, // Assuming the relation field in your Prisma schema is named 'Business'
        // Other fields can also be selected as needed, excluding the password
      },
    });
    return new NextResponse(
      JSON.stringify({ data: user, message: "success get profile" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Session Retrieval Error:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
