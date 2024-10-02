import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { time } from "console";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const body = await req.json();
  const { user_id, name, business_age, image, description, report } = body;

  if (!user_id || !name || !business_age || !report) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const business = await client.business.create({
      data: {
        name: name,
        business_age: business_age,
        image: image,
        description: description,
        owner_id: user_id,
      },
    });

    const businessReport = await client.businessReport.create({
      data: {
        date: new Date(),
        business_id: business.id,
        report: report,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", business },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
