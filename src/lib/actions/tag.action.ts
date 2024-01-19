"use server"

import { FilterQuery } from "mongoose";

import { connectToDatabase } from "../mongoose"

import User from "@/database/user.model";

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams
} from "./shared.types";

import Question from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";

export async function getTopInteractedTags(getTopParams: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, limit = 3 } = getTopParams;

    const user = await User.findById(userId);

    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }


    // find interaction tags for the user and group by tags...

    return [
      { _id: 1, name: 'Next js' },
      { _id: 2, name: 'React js' },
    ]

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getAllTags(getTagsParams: GetAllTagsParams) {
  try {
    connectToDatabase();


    const tags
      = await Tag.find({}).sort({ createAt: -1 })

    if (!tags) {
      throw new Error("User not found");
    }

    return { tags };

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getQuestionsByTagId(getTagsParams: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId,
      // page = 1, pageSize = 10,
      searchQuery,
    } = getTagsParams;

    const tagFilter: FilterQuery<ITag> = { _id: tagId }


    const tag = await Tag.findOne(tagFilter)
      .populate({
        path: 'questions',
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: 'i' } }
          : {},
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: 'tags', model: Tag, select: "_id name" },
          { path: 'author', model: User, select: "_id clerkId name picture" },
        ]
      });

    if (!tag) {
      throw new Error('Tag not Found');
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };

  } catch (error) {
    console.log(error);
    throw error;
  }
};


export async function getTopPopularTags() {
  try {
    connectToDatabase();


    const popularTags = await Tag.aggregate(
      [
        { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
        { $sort: { numberOfQuestions: -1 } },
        { $limit: 5 },
      ]
    )

    return popularTags;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
