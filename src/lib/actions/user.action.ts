"use server"

import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

import User from "@/database/user.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

import { connectToDatabase } from "../mongoose"

import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams
} from "./shared.types";



export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    console.log(userId);

    const user = await User.findOne({ clerkId: userId });

    console.log(user);

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

export async function getAllUsers(allUserParam: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery
    // } = allUserParam;

    const users
      = await User.find({}).sort({ createAt: -1 })


    return { users };

  } catch (error) {
    console.log(error);
    throw error;
  }
};


export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not Found');
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true },
      )
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true },
      )
    }


    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId,
      // page = 1, pageSize = 10, filter, 
      searchQuery
    } = params;

    const query: FilterQuery<typeof Question> =
      searchQuery
        ? { title: { $regex: new RegExp(searchQuery, 'i') } }
        : {};

    const user = await User.findOne({ clerkId })
      .populate({
        path: 'saved',
        match: query,
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: 'tags', model: Tag, select: "_id name" },
          { path: 'author', model: User, select: "_id clerkId name picture" },
        ]
      });

    if (!user) {
      throw new Error('User not Found');
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };


  } catch (error) {
    console.log(error);
    throw error;
  }
};