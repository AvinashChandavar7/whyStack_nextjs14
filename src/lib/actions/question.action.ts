"use server"

import { connectToDatabase } from "../mongoose";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { title, content, tags, author } = params;

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


  } catch (error) {
    console.log(error);
  }
}