import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchPostViewsSchema = z.object({
  postId: z.string().cuid(),
});
export type FetchPostViewsRequestProps = {
  postId: string;
};

export const POST = async (request: Request) => {
  const body: FetchPostViewsRequestProps = await request.json();
  const parsedBody = FetchPostViewsSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const views = await prisma.view.count({
        where: {
          postId: body.postId,
        },
      });
      return NextResponse.json({
        success: true,
        viewArray: views,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: error,
      });
    }
  }
};
