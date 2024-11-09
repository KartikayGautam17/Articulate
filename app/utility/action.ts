"use server";

import axios from "axios";
import { DeleteUserRequest } from "../api/action/user/delete/route";
import { actionApiResponseProps, ResponseDataProps } from "./types";
import { ProfileRequestProps } from "../api/action/user/profile/create/route";
import { UpdateProfileRequestProps } from "../api/action/user/profile/update/route";
import { FollowRequestProps } from "../api/action/user/follow/create/route";
import { DeleteFollowRequestProps } from "../api/action/user/follow/delete/route";
import { CreatePostRequestProps } from "../api/action/user/post/create/route";
import { UpdatePostRequestProps } from "../api/action/user/post/update/route";
import { DeletePostRequestProps } from "../api/action/user/post/delete/route";
import { SavePostRequest } from "../api/action/user/post/save/route";
import { UnsavePostSchemaProps } from "../api/action/user/post/save/delete/route";
import { LikePostRequestProps } from "../api/action/user/post/like/route";
import { DeleteLikeSchemaProps } from "../api/action/user/post/like/delete/route";
import { DislikePostRequestProps } from "../api/action/user/post/dislike/route";
import { DeleteDislikeRequest } from "../api/action/user/post/dislike/delete/route";
import { ViewPostRequest } from "../api/action/user/post/view/route";
import { CreateCommentRequestProps } from "../api/action/user/post/comment/create/route";
import { DeleteCommentSchemaProps } from "../api/action/user/post/comment/delete/route";
import { LikeCommentRequestProps } from "../api/action/user/post/comment/like/route";
import { DeleteCommentLikeSchemaProps } from "../api/action/user/post/comment/like/delete/route";
import { DislikeCommentRequestProps } from "../api/action/user/post/comment/dislike/route";
import { DeleteCommentDislikeSchemaProps } from "../api/action/user/post/comment/dislike/delete/route";
/*
    USER RELATED ACTIONS
*/

/**
 * Deletes the account. [api/action/user/delete]
 *
 * @param {string} userId
 * @returns User
 */

export const deleteAccount = async ({
  userId,
}: DeleteUserRequest): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/delete",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.user };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Creates the user profile. [api/action/user/profile/create]
 *
 * Age parameter should be a number.
 *
 * @param {string} {userId,name,description,age,image,tags}
 * @returns Profile
 */

export const createProfile = async ({
  userId,
  name,
  description,

  image,
}: ProfileRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/profile/create",
    {
      userId,
      name,
      description,

      image,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.profile };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Updates the user profile. [api/action/user/profile/update]
 *
 * Age parameter should be a number.
 *
 * @param {string} {userId,name,description,age,image,tags}
 * @returns Profile
 */

export const updateProfile = async ({
  userId,
  name,
  description,
  links,
  image,
}: UpdateProfileRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/profile/update",
    {
      userId,
      name,
      description,
      links,
      image,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.profile };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Follows a user [api/action/user/follow/create]
 *
 * @param {string} {userId,targetId}
 * @returns Profile
 */

export const createFollower = async ({
  userId,
  targetId,
}: FollowRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/follow/create",
    {
      userId,
      targetId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.follow };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Unfollows a user [api/action/user/follow/delete]
 *
 * @param {string} {userId,targetId}
 * @returns Follow
 */

export const deleteFollower = async ({
  userId,
  targetId,
}: DeleteFollowRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/follow/delete",
    {
      userId,
      targetId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.follow };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/*
    POST RELATED ACTIONS
*/

/**
 * Create a Post [api/action/user/post/create]
 *
 * Images has type array, rest are string.
 *
 * @param {string} {authorId,title,content,images}
 * @returns Post
 */

export const createPost = async ({
  authorId,
  title,
  content,
  images,
}: CreatePostRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/create",
    {
      authorId,
      title,
      content,
      images,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.post };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Update a Post [api/action/user/post/update]
 *
 * Images has type array, rest are string.
 *
 * @param {string} {title,content,images}
 * @returns Post
 */

export const updatePost = async ({
  title,
  content,
  images,
}: UpdatePostRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/update",
    {
      title,
      content,
      images,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.post };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Delete a Post [api/action/user/post/delete]
 *
 * @param {string} {postId,userId}
 * @returns Post
 */

export const deletePost = async ({
  postId,
  userId,
}: DeletePostRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/delete",
    {
      postId,
      userId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.post };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Save a Post [api/action/user/post/save]
 *
 * @param {string} {userId,postId}
 * @returns Save
 */

export const savePost = async ({
  userId,
  postId,
}: SavePostRequest): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/save",
    {
      userId,
      postId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.save };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Un-Save a Post [api/action/user/post/delete]
 *
 * @param {string} {userId,postId}
 * @returns Save
 */

export const unSavePost = async ({
  userId,
  saveId,
}: UnsavePostSchemaProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/save/delete",
    {
      userId,
      saveId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.save };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Like a Post [api/action/user/post/delete]
 *
 * @param {string} {userId,postId}
 * @returns Like
 */

export const likePost = async ({
  postId,
  userId,
}: LikePostRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/like",
    {
      postId,
      userId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.like };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Un-Like a Post [api/action/user/post/like/delete]
 *
 * @param {string} {userId,likeId}
 * @returns Like
 */

export const unLikePost = async ({
  likeId,
}: DeleteLikeSchemaProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/like/delete",
    {
      likeId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.like };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Dislike a Post [api/action/user/post/dislike]
 *
 * @param {string} {postId,userId}
 * @returns Dislike
 */

export const dislikePost = async ({
  postId,
  userId,
}: DislikePostRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/dislike",
    {
      postId,
      userId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.dislike };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Un-Dislike a Post [api/action/user/post/dislike/delete]
 *
 * @param {string} {dislikeId,userId}
 * @returns Dislike
 */

export const unDislikePost = async ({
  dislikeId,
}: DeleteDislikeRequest): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/dislike/delete",
    {
      dislikeId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.dislike };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * View a Post [api/action/user/post/view]
 *
 * @param {string} {postId,userId}
 * @returns View
 */

export const viewPost = async ({
  userId,
  postId,
}: ViewPostRequest): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/view",
    {
      postId,
      userId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.view };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/*
    COMMENT RELATED ACTIONS
*/

/**
 * Create a comment [api/action/user/post/comment/create]
 *
 * @param {string} {postId,userId,content}
 * @returns Comment
 */

export const createComment = async ({
  content,
  postId,
  userId,
}: CreateCommentRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/comment/create",
    {
      postId,
      userId,
      content,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.comment };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Delete a comment [api/action/user/post/comment/delete]
 *
 * @param {string} {commentId,userId}
 * @returns Comment
 */

export const deleteComment = async ({
  commentId,
}: DeleteCommentSchemaProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/comment/delete",
    {
      commentId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.comment };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Like a comment [api/action/user/post/comment/like]
 *
 * @param {string} {commentId,userId}
 * @returns commentLike
 */

export const likeComment = async ({
  commentId,
  userId,
}: LikeCommentRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/comment/like",
    {
      commentId,
      userId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.commentLike };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Un-Like a comment [api/action/user/post/comment/like/delete]
 *
 * @param {string} {commentLikeId,userId}
 * @returns commentLike
 */

export const unLikeComment = async ({
  commentLikeId,
}: DeleteCommentLikeSchemaProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL +
      "api/action/user/post/comment/like/delete",
    {
      commentLikeId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.commentLike };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Dislike a comment [api/action/user/post/comment/dislike]
 *
 * @param {string} {commentId,userId}
 * @returns commentDislike
 */

export const dislikeComment = async ({
  commentId,
  userId,
}: DislikeCommentRequestProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/action/user/post/comment/dislike",
    {
      commentId,
      userId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.commentDislike };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Un-Dislike a comment [api/action/user/post/comment/dislike/delete]
 *
 * @param {string} {commentDislikeId,userId}
 * @returns commentDislike
 */

export const unDislikeComment = async ({
  commentDislikeId,
}: DeleteCommentDislikeSchemaProps): Promise<actionApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL +
      "api/action/user/post/comment/dislike/delete",
    {
      commentDislikeId,
    }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.commentDislike };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};
