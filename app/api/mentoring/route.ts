import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { CreateMentoringRequest } from "@/app/pengajuan-mentoring/page";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();

  const { title, description, requestDate } = body as CreateMentoringRequest;
  try {
    const mentors = await client.userAccount.findMany({
      where: {
        role: 2,
      },
      select: {
        id: true,
      },
    });

    const latestBusiness = await client.business.findFirst({
      where: {
        owner_id: token?.id?.toString(),
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const randomMentorId = mentors[Math.floor(Math.random() * mentors.length)];

    if (token?.role !== 3) {
      throw new Error("Need to be seeker to request");
    }

    const newMentoring = await client.mentoring.create({
      data: {
        Topic: title,
        requested_date: requestDate,
        mentee_id: token?.id?.toString() || "",
        Description: description,
        mentoring_status: 0,
        mentor_id: randomMentorId.id,
        business_id: latestBusiness?.id || "",
      },
    });

    return new NextResponse(
      JSON.stringify({
        data: newMentoring,
        message: "Success created mentoring request",
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

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token?.role !== 2) {
    throw new Error("Only mentor could access this feature.");
  }

  try {
    const mentoringDetails = await client.mentoring.findMany({
      include: {
        mentee: true,
        mentor: true,
        business: {
          include: {
            owner: true,
          },
        },
      },
      where: {
        mentor_id: token?.id?.toString(),
      },
    });

    const formattedData = mentoringDetails.map((mentoring) => ({
      businessImage: mentoring.business?.image || null,
      businessName: mentoring.business?.name || null,
      businessOwnerName: mentoring.business?.owner?.name || null,
      mentoringTopic: mentoring.Topic,
      mentoringDate: mentoring.requested_date || null,
      mentoringId: mentoring.id,
    }));

    return new NextResponse(
      JSON.stringify({
        data: formattedData,
        message: "Success get Mentoring Requests",
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
