import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import {
  FormattedForum,
  PostFeedsRequest,
  ForumResponse,
  ForumComment,
} from "@/app/utils/PostFeeds";
import { InvestorViewCardList } from "@/app/utils/investorView";
import { formatDistanceToNow, parseISO } from "date-fns"; // Used for date calculations

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  }
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    const user = await client.crowdfunding.findMany({
      select: {
        id: true,
        created_at: true,
        name: true,
        end_date: true,
        target_amount: true,
        amount: true,
        owner: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedData: InvestorViewCardList[] = user.map((crowdfunding) => {
      // Calculate days left until the end date
      const daysLeft = Math.ceil(
        (parseISO(crowdfunding.end_date.toISOString()).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const progressValue = Math.round(
        (Number(crowdfunding.amount) / Number(crowdfunding.target_amount)) * 100
      );

      return {
        progressValue: progressValue || 0, // Default to 0 if calculation fails
        avatarFallback: "", // Placeholder, adjust as needed
        title: crowdfunding.name,
        owner: crowdfunding?.owner?.name || "",
        daysLeft,
      };
    });
    return new NextResponse(
      JSON.stringify({ data: formattedData, message: "success get forum" }),
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
