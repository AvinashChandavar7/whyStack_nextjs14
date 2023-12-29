import mongoose from "mongoose";

let isConnected: boolean = false;


const DB_NAME = "why_stack"
// const MONGODB_URL = process.env.MONGODB_URL;


export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL is missing');
  }


  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

    isConnected = true;
    console.log(`\n MongoDB connection DB HOST : ${connectionInstance.connection.host}`);

  } catch (error) {
    console.log("\n MONGODB connection Failed: ", error);
    process.exit(1);
  }

  if (!isConnected) {
    console.log('MONGODB_URL is already connected', process.env.MONGODB_URL);
  }

};
