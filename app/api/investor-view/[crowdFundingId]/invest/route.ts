import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { crowdFundingID } }: { params: { crowdFundingID: string } },
) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
        status: 401,
      });
    }
    // const session = { user: { id: "dc090071-d078-470c-860d-f6f2ac4e02c7" } };
    const funding = await client.crowdfunding.findFirst({
      where: {
        id: crowdFundingID,
      },
      include: {
        FundingData: true,
      },
    });

    if (!funding) {
      return new NextResponse(
        JSON.stringify({ message: "Funding data not found" }),
        { status: 404 },
      );
    }

    const {
      amount,
      proof,
      idReward,
    }: { amount: number; proof: string; idReward: string } = await req.json();

    if (!amount || !proof || !idReward) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    await client.fundingData.create({
      data: {
        amount: amount,
        crowdfundingId: funding.id,
        crowdfunding_item_id: idReward,
        investor_id: session.user.id,
        funding_status: true,
        received_status: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        data: null,
        message: "Invest successfull",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ messsage: "Internal server error" }),
      { status: 500 },
    );
  }
}
