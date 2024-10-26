import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteDislikeSchema = z.object({
  dislikeId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type DeleteDislikeRequest = {
  dislikeId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteDislikeRequest = await request.json();
  const parsedBody = DeleteDislikeSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const dislike = await prisma.dislike.delete({
        where: {
          id: body.dislikeId,
          userId: body.userId,
        },
      });
      return NextResponse.json({ success: true, dislike: dislike });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: parsedBody.error,
      });
    }
  }
};
