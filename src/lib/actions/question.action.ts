"use server"

import { connectToDatabase } from "../connectDB";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

import { revalidatePath } from 'next/cache';

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { title, content, tags, author, path } = params;

    // Create the  question
    const question = await Question.create(
      { title, content, author }
    );


    console.log(question);

    const tagDocuments = [];

    // Create the tags or get them if they already exist

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id }
        },
        { upsert: true, new: true, },
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagDocuments } } },
    );


    // Create an interaction record for the user's ask question action


    // Increment author's reputation by +5 for creating a question
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}