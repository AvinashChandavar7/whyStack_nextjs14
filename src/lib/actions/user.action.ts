"use server"

import { connectToDatabase } from "../connectDB";

import User from "@/database/user.model";



export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    console.log(userId);

    const user = await User
      .findOne({ clerkId: userId })
      .catch((error) => {
        console.error("User query error:", error);
        throw error;
      });

    console.log(user);

    return user;

  } catch (error: any) {
    console.error("Database connection error:", error);
    throw error;
  }
}