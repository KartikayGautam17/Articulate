// What is ResponseDataProps and fetchApiResponseProps?
//
// Not a major difference but...
//
// ResponseDataProps refers to the type of data recieved on calling the API routes on api/fetch... or api/action/..
//
// fetchApiResponseProps refers to the type of data recieved on calling the utility functions which make async post request
// to the above API Routes

import {
  Follows,
  Profile,
  Post,
  Comment,
  Like,
  Dislike,
  View,
  Save,
  CommentDislike,
  CommentLike,
} from "@prisma/client";

export type ResponseDataProps =
  | {
      success: boolean;
      error?: any;
      reason?: string;
    } & ResponseData;

export type fetchApiResponseProps = {
  success: boolean;
  data: fetchApiData;
  error?: string;
  reason?: string;
};

type ResponseData = {
  profile?: Profile;
  followersArray?: Follows[];
  followingArray?: Follows[];
  postArray?: Post[];
  commentArray?: Comment[];
  viewsArray?: View[];
  likeArray?: Like[];
  dislikeArray?: Dislike[];
  commentLikeArray?: CommentLike[];
  commentDislikeArray?: CommentDislike[];
};

type fetchApiData =
  | Profile
  | Follows
  | Follows[]
  | Post
  | Post[]
  | Comment
  | Comment[]
  | View
  | View[]
  | CommentLike[]
  | CommentDislike[]
  | undefined
  | null;
