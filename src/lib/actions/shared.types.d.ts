import { Schema } from "mongoose";

import { IUser } from "@/database/user.model";


// Question interface
export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

export interface GetQuestionsByIdParams {
  questionId: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted?: boolean;
  hasdownVoted?: boolean;
  path: string;
}


// User interface

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

// Get All User interface

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}
export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserByIdParams {
  userId: string;
}





// answer 

export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}
export interface GetAnswerParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted?: boolean;
  hasdownVoted?: boolean;
  path: string;
}


// Tags
export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}


export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}


// view

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}
