import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const FetchUserProfile = z.object({
  userId: z.string().cuid(),
});

export type FetchUserProfileRequestProps = {
  userId: string;
};

export const POST = async (request: Request) => {
  const body: FetchUserProfileRequestProps = await request.json();
  const parsedBody = FetchUserProfile.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          userId: body.userId,
        },
      });
      return NextResponse.json({
        success: true,
        profile: profile,
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
