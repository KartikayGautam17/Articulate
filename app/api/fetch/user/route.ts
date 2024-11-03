import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchUserIdbyEmail = z.object({
  email: z.string().email(),
});

export type FetchUserIdRequestProps = {
  email: string;
};

export const POST = async (request: Request) => {
  const body: FetchUserIdRequestProps = await request.json();
  console.log("BODY JSON " + body);
  const parsedBody = FetchUserIdbyEmail.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const userId = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
        select: {
          id: true,
        },
      });
      return NextResponse.json({
        success: true,
        userId: userId,
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

export const GET = async () => {
  return NextResponse.json({ a: "abcd" });
};
