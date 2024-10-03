import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
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
        CrowdfundingItem: true,
      },
    });

    if (!funding) {
      return new NextResponse(
        JSON.stringify({ message: "Funding data not found" }),
        { status: 404 },
      );
    }

    const amounts: number[] = [];
    for (let i = 0; i < funding.CrowdfundingItem.length; i++) {
      if (
        !amounts.includes(
          parseInt(funding.CrowdfundingItem[i].amount.toString()),
        )
      ) {
        amounts.push(parseInt(funding.CrowdfundingItem[i].amount.toString()));
      }
    }

    const newData = [];

    for (let i = 0; i < amounts.length; i++) {
      const d = {
        title: `Reward ${i + 1}`,
        milestone: Math.round(
          (amounts[i] / parseInt(funding.target_amount.toString())) * 100,
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rewards: [] as any[],
      };

      for (let j = 0; j < funding.CrowdfundingItem.length; j++) {
        if (
          parseInt(funding.CrowdfundingItem[j].amount.toString()) === amounts[i]
        ) {
          d.rewards.push({
            imageSrc: funding.CrowdfundingItem[j].image,
            title: funding.CrowdfundingItem[j].name,
            id: funding.CrowdfundingItem[j].id,
            quantity: parseInt(funding.CrowdfundingItem[j].amount.toString()),
          });
        }
      }

      newData.push(d);
    }

    return new NextResponse(
      JSON.stringify({
        data: newData,
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
