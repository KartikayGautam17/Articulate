import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const FetchPostSchema = z.object({
  id: z.string().cuid(),
});

export type FetchPostbyIdRequestProps = {
  id: string;
};

export const POST = async (request: Request) => {
  const body: FetchPostbyIdRequestProps = await request.json();
  const parsedBody = FetchPostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: body.id,
        },
      });
      return NextResponse.json({ success: true, post: post });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Error in Prisma Fetch",
        error: error,
      });
    }
  }
};
