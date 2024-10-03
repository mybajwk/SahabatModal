import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function DELETE(
  req: NextRequest,
  { params: { crowdFundingID } }: { params: { crowdFundingID: string } }
) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
        status: 401,
      });
    }

    await client.crowdfundingItem.deleteMany({
      where: {
        crowdfunding_id: crowdFundingID,
      },
    });

    await client.crowdfundingFaq.deleteMany({
      where: {
        crowdfunding_id: crowdFundingID, // Adjust the field name as needed
      },
    });

    await client.crowdfunding.delete({
      where: {
        id: crowdFundingID,
      },
    });

    return new NextResponse(JSON.stringify({ message: "delete success" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
