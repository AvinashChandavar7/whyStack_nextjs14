"use server"

import { connectToDatabase } from "../mongoose"

import User from "@/database/user.model";

import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(getTopParams: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = getTopParams;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    console.log(limit);

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