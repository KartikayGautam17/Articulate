"use server";
import prisma from "@/lib/prisma-adapter";

type PromiseProps = {
  success: boolean;
  error?: any;
  data?: string;
};

export const getIsPostSaved = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<PromiseProps> => {
  try {
    const response = await prisma.save.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    if (!response) {
      return { success: false, error: "Could not find" };
    }
    return { success: true, data: response?.id };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const savePost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<PromiseProps> => {
  try {
    const response = await prisma.save.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    if (response) {
      return { success: true, data: response.id };
    } else {
      return { success: true, error: "Could not create" };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

export const unSavePost = async ({
  saveId,
}: {
  saveId: string;
}): Promise<PromiseProps> => {
  try {
    const response = await prisma.save.delete({
      where: {
        id: saveId,
      },
    });
    if (response) {
      return { success: true, data: response.id };
    } else {
      return { success: false, data: "Could not find save" };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const createFollower = async ({
  userId,
  targetId,
}: {
  userId: string;
  targetId: string;
}): Promise<PromiseProps> => {
  try {
    const response = await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: targetId,
      },
    });
    if (response) {
      return { success: true, data: response.id };
    } else {
      return { success: false, error: "some error" };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteFollower = async ({
  followId,
}: {
  followId: string;
}): Promise<PromiseProps> => {
  try {
    const response = await prisma.follows.delete({
      where: {
        id: followId,
      },
    });
    if (response) {
      return { success: true, data: response.id };
    } else {
      return { success: false, error: "Could not find follow" };
    }
  } catch (error) {
    return { success: false, error };
  }
};
