import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  if (req.method != "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    // Get the file from the request body (assuming form-data is used)
    const body = await req.formData();
    const file = body.get("file");
    const file_name = body.get("file_name")?.toString() || "";

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 405 }
      );
    }

    // Upload the file to Vercel Blob (this assumes you have Vercel Blob storage set up)
    const uploadedFile = await put(file_name, file, { access: "public" });

    return NextResponse.json(
      { message: "media uploaded successfully", uploadedFile },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
