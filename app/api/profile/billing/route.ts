import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    const billingAddress = await client.userBillingAddress.findUnique({
      where: {
        id: token?.id?.toString() || "",
      },
      select: {
        id: true,
        created_at: true,
        email: true,
        phone_number: true,
        name: true,
        address_line: true,
        company_name: true,
        country: true,
        state_province: true,
        zip_code: true,
      },
    });
    return new NextResponse(
      JSON.stringify({
        data: billingAddress,
        message: "success get profile billing address",
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
export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const {
    name,
    email,
    phone_number,
    company_name,
    address_line,
    country,
    state_province,
    zip_code,
  } = body;

  if (
    !name ||
    !email ||
    !phone_number ||
    !company_name ||
    !address_line ||
    !country ||
    !state_province ||
    !zip_code
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const billingAddress = await client.userBillingAddress.upsert({
      where: {
        user_id: token?.id?.toString() || "",
      },
      update: {
        name: name,
        email: email,
        phone_number: phone_number,
        address_line: address_line,
        company_name: company_name,
        country: country,
        state_province: state_province,
        zip_code: zip_code,
      },
      create: {
        user_id: token?.id?.toString() || "",
        name: name,
        email: email,
        phone_number: phone_number,
        address_line: address_line,
        company_name: company_name,
        country: country,
        state_province: state_province,
        zip_code: zip_code,
      },
    });

    return new NextResponse(
      JSON.stringify({ data: null, message: "success update billing address" }),
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
