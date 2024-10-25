import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const FetchPostSchema = z.object({
  userId: z.string().cuid(),
});

type FetchPostRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchPostRequestProps = await request.json();
  const parsedBody = FetchPostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reasons: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: body.userId,
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
