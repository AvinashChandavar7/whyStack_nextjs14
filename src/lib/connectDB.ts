import mongoose from "mongoose";

let isConnected: boolean = false;

const MONGODB_URL = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!MONGODB_URL) {
    return console.log('Missing MONGODB URL');
  }
  if (!isConnected) {
    return console.log('MongoDB is already connected');
  }

  try {
    await mongoose.connect(MONGODB_URL);

    isConnected = true;
  } catch (error: any) {
    console.log(error.message);
  }
}