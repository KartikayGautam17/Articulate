import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const FetchViewedPostsSchema = z.object({
  userId: z.string().cuid(),
});

export type FetchViewedPostsRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchViewedPostsRequestProps = await request.json();
  const parsedBody = FetchViewedPostsSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const posts = await prisma.view.findMany({
        where: {
          userId: body.userId,
        },
        distinct: ["postId"],
        select: {
          post: true,
        },
      });
      posts.sort((a, b) => {
        return a.post.createdAt > b.post.createdAt ? -1 : 1;
      });
      return NextResponse.json({ success: true, postArray: posts });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Error in Prisma Fetch",
        error: error,
      });
    }
  }
};
