"use server"

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import {
  CreateQuestionParams,
  GetQuestionsByIdParams,
  GetQuestionsParams
} from "./shared.types";



export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();


    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createAt: -1 })

    return { questions };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create the question

    const question = await Question.create({
      title,
      content,
      author
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") } // filter
        },
        {
          $setOnInsert: { name: tag },            // update
          $push: { question: question._id }       // update
        },
        {
          upsert: true, new: true,               // additional
        },
      );

      tagDocuments.push(existingTag._id);
    }


    await Question.findByIdAndUpdate(
      question._id,
      {
        $push: {
          tags: {
            $each: tagDocuments
          }
        }
      }
    );

    // Create an interaction record fpr the user's ask_question action


    // Increment the author's reputation by +5 for creating a question
    revalidatePath(path);

  } catch (error) {
    console.log(error);
  }
}


export async function getQuestionById(params: GetQuestionsByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: '_id clerkId name picture' });

    return question;

  } catch (error) {
    console.log(error);
    throw error;
  }
}