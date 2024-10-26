import prisma from "@/lib/prisma-adapter";
import { NextResponse } from "next/server";
import { z } from "zod";

const UnsavePostSchema = z.object({
  saveId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type UnsavePostSchemaProps = {
  saveId: string;
  userId: string;
};

export const POST = async (request: Request) => {
  const body: UnsavePostSchemaProps = await request.json();
  const parsedBody = UnsavePostSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request Body",
      error: parsedBody.error,
    });
  } else {
    try {
      const save = await prisma.save.delete({
        where: {
          id: body.saveId,
          userId: body.userId,
        },
      });
      return NextResponse.json({ success: true, save: save });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reason: "Prisma Error",
        error: parsedBody.error,
      });
    }
  }
};
