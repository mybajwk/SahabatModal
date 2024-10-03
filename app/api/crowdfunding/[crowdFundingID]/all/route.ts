import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

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
  const session = await getServerSession(options);
  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
      status: 401,
    });
  }

  try {
    await client.crowdfunding.update({
      where: {
        id: crowdFundingID,
      },
      // create: {
      //   address_line: address,
      //   amount: 0,
      //   end_date: endDate,
      //   start_date: startDate,
      //   media: media,
      //   status: 1,
      //   target_amount: fund,
      //   address_url: gmaps,
      //   seeker_id: token?.id?.toString() || "",
      // },
      data: {
        status: 4,
      },
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
