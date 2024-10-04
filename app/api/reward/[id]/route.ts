import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
        status: 401,
      });
    }

    // const session = { user: { id: "dc090071-d078-470c-860d-f6f2ac4e02c7" } };

    const reward = await client.crowdfundingItem.findFirst({
      where: {
        id: id,
      },
    });

    if (!reward) {
      return new NextResponse(
        JSON.stringify({ message: "Reward data not found" }),
        { status: 404 },
      );
    }

    return new NextResponse(
      JSON.stringify({
        data: {
          ...reward,
          amount: parseInt(reward.amount.toString()),
        },
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
