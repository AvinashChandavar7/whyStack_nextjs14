"use server"

import { connectToDatabase } from "../connectDB";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}