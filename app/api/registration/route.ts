import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const body = await req.json();
  const { username, email, phone_number, password, name, role } = body;

  if (!username || !name || !email || !password || !phone_number || !role) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.userAccount.create({
      data: {
        username: username,
        email: email,
        name: name,
        role: role,
        password: hashedPassword,
        phone_number: phone_number,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Prisma error for duplicate entry
        return NextResponse.json(
          { message: "Email, Mobile Phone, or Username already exists" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
