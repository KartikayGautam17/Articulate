import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteLikeSchema = z.object({
  likeId: z.string().cuid(),
});

export type DeleteLikeSchemaProps = {
  likeId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteLikeSchemaProps = await request.json();
  const parsedBody = DeleteLikeSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const like = await prisma.like.delete({
        where: {
          id: body.likeId,
        },
      });
      return NextResponse.json({ success: true, like: like });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: parsedBody.error,
      });
    }
  }
};
