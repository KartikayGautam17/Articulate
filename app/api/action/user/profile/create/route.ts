import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const ProfileSchema = z.object({
  userId: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  links: z.array(z.string()),
});

export type ProfileRequestProps = {
  userId: string;
  name: string;
  description: string;
  image: string;
  links: string[];
};

export const POST = async (request: Request) => {
  const body: ProfileRequestProps = await request.json();
  const parsedBody = ProfileSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reason: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const profile = await prisma.profile.create({
        data: {
          userId: body.userId,
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
