"use server"

import { revalidatePath } from "next/cache";

import User from "@/database/user.model";
import Question from "@/database/question.model";

import { connectToDatabase } from "../mongoose"

import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams
} from "./shared.types";



export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function createUser(userDataParams: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userDataParams);

    return newUser;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function updateUser(updateDataParams: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = updateDataParams;

    await User.findByIdAndUpdate(
      { clerkId }, updateData, { new: true }
    );

    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
};
export async function deleteUser(deleteDataParams: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId, } = deleteDataParams;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete the user from the database
    // and questions,answers,comments, etc...

    // get user questions ids
    const userQuestionsIds = await Question
      .find({ author: user._id })
      .distinct('_id');

    console.log(userQuestionsIds);

    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc...

    const deleteUser = await User.findByIdAndDelete({ author: user._id });

    return deleteUser;

  } catch (error) {
    console.log(error);
    throw error;
  }
};