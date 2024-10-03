import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { PostCrowdFundingRewardRequest } from "@/app/utils/PostCrowdFunding";

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
  const { reward } = body as PostCrowdFundingRewardRequest;

  if (!reward) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    await client.crowdfundingItem.deleteMany({
      where: {
        crowdfunding_id: crowdFundingID,
      },
    });

    reward.map(async (faqItem) => {
      return await client.crowdfundingItem.create({
        data: {
          crowdfunding_id: crowdFundingID,
          amount: faqItem.fundLimit,
          description: faqItem.itemDesc,
          image: faqItem.itemImage,
          jenis_item: faqItem.itemType,
          name: faqItem.itemTitle,
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
