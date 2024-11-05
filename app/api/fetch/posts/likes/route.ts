import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchPostLikesSchema = z.object({
  postId: z.string().cuid(),
});

export type FetchPostLikesRequestProps = {
  postId: string;
};

export const POST = async (request: Request) => {
  const body: FetchPostLikesRequestProps = await request.json();
  const parsedBody = FetchPostLikesSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const postLikes = await prisma.like.findMany({
        where: {
          postId: body.postId,
        },
      });
      return NextResponse.json({
        success: true,
        likeArray: postLikes,
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
