"use server"

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose";

import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswerParams
} from "./shared.types";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";


export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content, author, question
    });


    // Add the answer to the question's answer array

    await Question.findByIdAndUpdate(
      question,
      { $push: { answers: newAnswer._id } },
    );

    // TODO: Add interaction...

    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswer(params: GetAnswerParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    console.log(questionId);

    const answers = await Answer.find(
      { question: questionId }
    ).populate("author", "_id clerkId name picture"
    ).sort({ createdAt: -1 })


    return { answers };

  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId,
      hasupVoted, hasdownVoted, path
    } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId }
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      { new: true }
    );

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation

    revalidatePath(path);


  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId,
      hasupVoted, hasdownVoted, path
    } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId }
      };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      { new: true }
    );

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation

    revalidatePath(path);


  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await answer.deleteOne({ _id: answerId });

    await Question.updateMany(
      { _id: answerId },
      { $pull: { answers: answerId } }
    );

    await Interaction.deleteMany({ answer: answerId });



    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}
