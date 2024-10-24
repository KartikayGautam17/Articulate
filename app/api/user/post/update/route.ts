import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-adapter";
import { z } from "zod";

const UpdatePostSchema = z.object({
  postId: z.string().cuid(),
  userId: z.string().cuid(),
  content: z.string().min(1),
  title: z.string().min(1),
  images: z.array(z.string().min(1)),
});

type UpdatePostRequestProps = {
  postId: string;
  userId: string;
  content: string;
  title: string;
  images: Array<string>;
};

export const POST = async (request: Request) => {
  const body: UpdatePostRequestProps = await request.json();
  const parsedData = UpdatePostSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedData.error,
    });
  } else {
    try {
      const post = await prisma.post.update({
        where: {
          id: body.postId,
          authorId: body.userId,
        },
        data: {
          title: body.title,
          content: body.content,
          images: body.images,
        },
      });
      return NextResponse.json({ success: true, post: post });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Error in prisma updating the post",
        error: error,
      });
    }
  }
};
