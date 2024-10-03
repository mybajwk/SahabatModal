import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const { old_password, new_password } = body;

  if (!old_password || !new_password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const getUserData = await client.userAccount.findUnique({
      where: {
        id: token?.id?.toString() || "",
      },
      select: {
        id: true,
        password: true,
      },
    });

    // compare password
    const isValidPassword = await bcrypt.compare(
      old_password,
      getUserData?.password || "",
    );
    if (isValidPassword) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    const user = await client.userAccount.update({
      where: {
        id: token?.id?.toString() || "",
      },
      data: {
        password: hashedPassword,
      },
    });
    return new NextResponse(
      JSON.stringify({ data: user.name, message: "success update profile" }),
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
