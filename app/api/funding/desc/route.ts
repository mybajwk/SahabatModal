import client from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorizedd" }), {
        status: 401,
      });
    }

    // const session = { user: { id: "dc090071-d078-470c-860d-f6f2ac4e02c7" } };

    const funding = await client.crowdfunding.findFirst({
      where: {
        seeker_id: session.user.id,
        status: 4,
      },
      include: {
        CrowdfundingFaq: true,
      },
    });

    if (!funding) {
      return new NextResponse(
        JSON.stringify({ message: "Funding data not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        desc: funding.Description,
        faq: funding.CrowdfundingFaq.map((d) => ({
          question: d.Question,
          answer: d.Answer,
          id: d.id,
        })),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ messsage: "Internal server error" }),
      { status: 500 }
    );
  }
}
