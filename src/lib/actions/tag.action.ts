"use server"

import { connectToDatabase } from "../mongoose"

import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import {
  GetAllTagsParams,
  GetTopInteractedTagsParams
} from "./shared.types";

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