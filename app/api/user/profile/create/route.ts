import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma-adapter";

const ProfileSchema = z.object({
  userId: z.string().cuid(),
  name: z.string().min(3),
  description: z.string(),
  age: z.number(),
  image: z.string(),
  tags: z.array(z.string()),
});

type ProfileRequestProps = {
  userId: string;
  name: string;
  description: string;
  age: number;
  image: string;
  tags: string[];
};

export const POST = async (request: Request) => {
  const body: ProfileRequestProps = await request.json();
  const parsedBody = ProfileSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({
      success: false,
      reasons: "Invalid Request",
      error: parsedBody.error,
    });
  } else {
    try {
      const profile = await prisma.profile.create({
        data: {
          userId: body.userId,
          name: body.name,
          age: body.age,
          description: body.description,
          image: body.image,
          tags: body.tags,
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
