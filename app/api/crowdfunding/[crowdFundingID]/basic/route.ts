import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { PostCrowdFundingBasicRequest } from "@/app/utils/PostCrowdFunding";

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
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const body = await req.json();
  const { address, gmaps, media, fund, endDate, startDate } =
    body as PostCrowdFundingBasicRequest;

  if (!address || !gmaps || !media || !fund || !endDate || !startDate) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
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
        address_line: address,
        amount: 0,
        end_date: endDate,
        start_date: startDate,
        media: media,
        status: 1,
        target_amount: fund,
        address_url: gmaps,
        seeker_id: token?.id || "",
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
