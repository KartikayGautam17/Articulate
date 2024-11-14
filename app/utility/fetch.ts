"use server";

import axios from "axios";
import { FetchUserProfileRequestProps } from "../api/fetch/profiles/route";
import { FetchFollowersRequestProps } from "../api/fetch/followers/route";
import { ResponseDataProps, fetchApiResponseProps } from "./types";
import { FetchFollowingRequestProps } from "../api/fetch/following/route";
import { FetchPostRequestProps } from "../api/fetch/posts/u/route";
import { FetchSavedPostsRequestProps } from "../api/fetch/posts/u/saved/route";
import { FetchLikedPostsRequestProps } from "../api/fetch/posts/u/liked/route";
import { FetchViewedPostsRequestProps } from "../api/fetch/posts/u/viewed/route";
import { FetchCommentsRequestProps } from "../api/fetch/posts/comments/route";
import { FetchPostViewsRequestProps } from "../api/fetch/posts/views/route";
import { FetchPostLikesRequestProps } from "../api/fetch/posts/likes/route";
import { FetchPostDisikesRequestProps } from "../api/fetch/posts/dislikes/route";
import { FetchCommentLikesRequestProps } from "../api/fetch/posts/comments/likes/route";
import { FetchCommentDislikesRequestProps } from "../api/fetch/posts/comments/dislikes/route";
import { FetchUserIdRequestProps } from "../api/fetch/user/route";
import { Post } from "@prisma/client";
import { FetchPostbyIdRequestProps } from "../api/fetch/posts/data/route";

/*
 ***** API CALLS TO FETCH USER RELATED DATA *****
 */

/**
 * Gets the User Profile [api/fetch/user].
 *
 * Requires email as string and returns the user profile if it exists,
 * otherwise returns null
 *
 * @returns userId
 * @param {string} {email}
 */

export const getUserIdbyEmail = async ({
  email,
}: FetchUserIdRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/fetch/user",
    { email }
  );
  const response_data: ResponseDataProps = response.data;
  console.log("RESPONSE DATA -*******- " + response_data);
  if (response_data.success) {
    return { success: true, data: response_data.userId };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets the User Profile [api/fetch/profiles].
 *
 * Requires userId as string and returns the user profile if it exists,
 * otherwise returns null
 *
 * @returns Profile
 * @param {string} {userId}
 */

export const getUserProfile = async ({
  userId,
}: FetchUserProfileRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/profiles",
    { userId }
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
 * Gets the User Followers [api/fetch/followers].
 *
 * Requires userId as string and returns an array of User's followers.
 * Return an Empty array if no followers are found.
 *
 * @returns Follow[]
 * @param {string} {userId}
 */

export const getUserFollowers = async ({
  userId,
}: FetchFollowersRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/followers",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.followersArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets the list of all other users that the current user is following. [api/fetch/following]
 *
 * Requires userId as string and returns an array of Users.
 * Return an empty array if user does not follow anyone else.
 *
 * @returns Follow[]
 * @param {string} {userId}
 */

export const getUserFollowing = async ({
  userId,
}: FetchFollowingRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/following",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.followingArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the posts published by the User.[api/fetch/posts/u]
 *
 * Requires userId as string and returns an array containing all the posts.
 * Returns an empty array if no posts are found.
 *
 * @param {string} {userId}
 * @returns Post[]
 */

export const getUserPosts = async ({
  userId,
}: FetchPostRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/u",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.postArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the posts that the user has saved. [api/fetch/posts/u/saved]
 *
 * Requires userId as string and returns an array containing all the posts.
 * Returns an empty array if no posts are found.
 *
 * @param {string} {userId}
 * @returns Post[]
 */

export const getUserPostsSaved = async ({
  userId,
}: FetchSavedPostsRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/u/saved",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.saveArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the posts that the user has liked. [api/fetch/posts/u/liked]
 *
 * Requires userId as string and returns an array containing all the posts.
 * Returns an empty array if no posts are found.
 *
 * @param {string} {userId}
 * @returns Post[]
 */

export const getUserPostsLiked = async ({
  userId,
}: FetchLikedPostsRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/u/liked",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.postArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the posts that the user has viewed. [api/fetch/posts/u/viewed]
 *
 * Requires userId as string and returns an array containing all the posts.
 * Returns an empty array if no posts are found.
 *
 * @param {string} {userId}
 * @returns Post[]
 */

export const getUserPostsViewed = async ({
  userId,
}: FetchViewedPostsRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/u/viewed",
    { userId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.postArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/*
    API Calls to fetch general data
*/

/**
 * Gets the post data by postId.[api/fetch/posts/data]
 *
 * Requires postId and returns the post.
 *
 * @returns Post
 */

export const getPostbyId = async ({
  id,
}: FetchPostbyIdRequestProps): Promise<fetchApiResponseProps> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/data",
      { id }
    );

    const response_data: ResponseDataProps = response.data;
    if (response_data.success) {
      return { success: true, data: response_data.post as Post };
    }
    return {
      success: false,
      data: null,
      error: response_data.error,
      reason: response_data.reason,
    };
  } catch (error) {
    return {
      success: false,
      error: error as string,
      data: null,
      reason: "try-block failed  ",
    };
  }
};

/**
 * Gets all the posts made by users on the platform.[api/fetch/posts]
 *
 * Requires no parameter and returns an array containing all the posts.
 *
 * @returns Post[]
 */

export const getPosts = async (): Promise<fetchApiResponseProps> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts",
      {}
    );
    const response_data: ResponseDataProps = response.data;
    if (response_data.success) {
      return { success: true, data: response_data.postArray as Post[] };
    }
    return {
      success: false,
      data: null,
      error: response_data.error,
      reason: response_data.reason,
    };
  } catch (error) {
    return {
      success: false,
      error: error as string,
      data: null,
      reason: "try-block failed  ",
    };
  }
};

/**
 * Gets all the comments made on a post made by users.[api/fetch/posts/comments]
 *
 * Requires postId as string and returns an array of comments.
 *
 * @param {string} {postId}
 * @returns Post[]
 */

export const getPostComments = async ({
  postId,
}: FetchCommentsRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    (process.env.NEXT_PUBLIC_BASE_URL as string) + "api/fetch/posts/comments",
    { postId }
  );
  const response_data: ResponseDataProps = response.data;

  if (response_data.success) {
    return { success: true, data: response_data.commentArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the views on a post.[api/fetch/posts/views]
 *
 * Requires postId as string and returns an array of views.
 *
 * @param {string} {postId}
 * @returns Post[]
 */

export const getPostsViews = async ({
  postId,
}: FetchPostViewsRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/views",
    { postId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.viewsArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the likes on a post.[api/fetch/posts/likes]
 *
 * Requires postId as string and returns an array of likes.
 *
 * @param {string} {postId}
 * @returns Post[]
 */

export const getPostsLikes = async ({
  postId,
}: FetchPostLikesRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/likes",
    { postId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.likeArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the dislikes on a post.[api/fetch/posts/dislikes]
 *
 * Requires postId as string and returns an array of dislikes.
 *
 * @param {string} {postId}
 * @returns Post[]
 */

export const getPostsDislikes = async ({
  postId,
}: FetchPostDisikesRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/dislikes",
    { postId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.dislikeArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the likes on a comment.[api/fetch/posts/comments/likes]
 *
 * Requires commentId as string and returns an array of likes.
 *
 * @param {string} {commentId}
 * @returns Post[]
 */

export const getCommentsLikes = async ({
  commentId,
}: FetchCommentLikesRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/comments/likes",
    { commentId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.commentLikeArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the dislikes on a comment.[api/fetch/posts/comments/dislikes]
 *
 * Requires commentId as string and returns an array of dislikes.
 *
 * @param {string} {commentId}
 * @returns Post[]
 */

export const getCommentsDislikes = async ({
  commentId,
}: FetchCommentDislikesRequestProps): Promise<fetchApiResponseProps> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "api/fetch/posts/comments/dislikes",
    { commentId }
  );
  const response_data: ResponseDataProps = response.data;
  if (response_data.success) {
    return { success: true, data: response_data.commentDislikeArray };
  }
  return {
    success: false,
    data: null,
    error: response_data.error,
    reason: response_data.reason,
  };
};

/**
 * Gets all the posts published by users on the platform.[api/fetch/posts]
 *
 * Requires no parameter and returns an array containing all the posts.
 *
 * @returns Post[]
 */
