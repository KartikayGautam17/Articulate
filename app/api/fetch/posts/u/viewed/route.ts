import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const FetchViewedPostsSchema = z.object({
  userId: z.string().cuid(),
});

type FetchViewedPostsRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchViewedPostsRequestProps = await request.json();
  const parsedBody = FetchViewedPostsSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reasons: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const posts = await prisma.view.findMany({
        where: {
          userId: body.userId,
        },
        select: {
          post: true,
        },
      });
      return NextResponse.json({ success: true, posts: posts });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Error in Prisma Fetch",
        error: error,
      });
    }
  }
};
