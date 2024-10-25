import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const DeleteUserSchema = z.object({
  userId: z.string().cuid(),
});

type DeleteUserReqquest = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: DeleteUserReqquest = await request.json();
  const parsedBody = DeleteUserSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const user = await prisma.user.delete({
        where: {
          id: body.userId,
        },
      });
      return NextResponse.json({
        success: true,
        user: user,
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
