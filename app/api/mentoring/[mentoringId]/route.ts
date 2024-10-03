import client from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  mentoringId: string;
}

export async function GET(
  req: NextRequest,
  { params: { mentoringId } }: { params: Params }
) {
  if (!mentoringId) {
    return new NextResponse(
      JSON.stringify({ message: "Mentoring Id Not Provided " }),
      {
        status: 400,
      }
    );
  }

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token?.role !== 2) {
      throw new Error("Only mentor could access this feature.");
    }

    const mentoringData = await client.mentoring.findFirst({
      where: {
        id: mentoringId,
      },
      include: {
        business: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        data: {
          description: mentoringData?.Description,
          businessName: mentoringData?.business?.name,
          businessImage: mentoringData?.business?.image,
        },
        message: "Success",
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
