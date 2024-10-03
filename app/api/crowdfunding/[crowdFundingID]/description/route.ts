import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { PostCrowdFundingDescRequest } from "@/app/utils/PostCrowdFunding";

interface Params {
  crowdFundingID: string;
}
export async function POST(
  req: NextRequest,
  { params: { crowdFundingID } }: { params: Params },
) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }

  const body = await req.json();
  const { deskripsi, faq } = body as PostCrowdFundingDescRequest;

  if (!deskripsi) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    await client.crowdfundingFaq.deleteMany({
      where: {
        crowdfunding_id: crowdFundingID,
      },
    });

    await client.crowdfunding.update({
      where: {
        id: crowdFundingID,
      },
      data: {
        Description: deskripsi,
      },
    });

    faq.map(async (faqItem) => {
      return await client.crowdfundingFaq.create({
        data: {
          crowdfunding_id: crowdFundingID,
          Question: faqItem.question,
          Answer: faqItem.answer,
        },
      });
    });

    return new NextResponse(
      JSON.stringify({
        data: null,
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
