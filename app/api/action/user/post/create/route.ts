import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(96),
  content: z.string().min(1),
  authorId: z.string().cuid(),
  images: z.array(z.string().min(1)),
});

export type CreatePostRequestProps = {
  title: string;
  content: string;
  authorId: string;
  images: Array<string>;
};

export const POST = async (request: Request) => {
  const body: CreatePostRequestProps = await request.json();
  const parsedData = CreatePostSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Data Format",
      error: parsedData.error.flatten(),
    });
  } else {
    try {
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: body.authorId,
          images: body.images,
        },
      });
      return NextResponse.json({ success: true, post: post });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Could not create post",
        error: error,
      });
    }
  }
};
