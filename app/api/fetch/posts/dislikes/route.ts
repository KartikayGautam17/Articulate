import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchPostDisikesSchema = z.object({
  postId: z.string().cuid(),
});

export type FetchPostDisikesRequestProps = {
  postId: string;
};

export const POST = async (request: Request) => {
  const body: FetchPostDisikesRequestProps = await request.json();
  const parsedBody = FetchPostDisikesSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const postDislikes = await prisma.dislike.findMany({
        where: {
          postId: body.postId,
        },
      });
      return NextResponse.json({
        success: true,
        dislikeArray: postDislikes,
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
