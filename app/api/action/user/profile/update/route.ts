import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const ProfileSchema = z.object({
  userId: z.string().cuid(),
  name: z.string(),
  description: z.string(),

  image: z.string(),
});

export type UpdateProfileRequestProps = {
  userId: string;
  name: string;
  description: string;
  image: string;
  links: string[];
};

export const POST = async (request: Request) => {
  const body: UpdateProfileRequestProps = await request.json();
  const parsedBody = ProfileSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const profile = await prisma.profile.update({
        where: {
          userId: body.userId,
        },
        data: {
          name: body.name,
          links: body.links,
          description: body.description,
          image: body.image,
        },
      });
      return NextResponse.json({
        success: true,
        profile: profile,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        reasons: "Prisma Error",
        error: error,
      });
    }
  }
};
