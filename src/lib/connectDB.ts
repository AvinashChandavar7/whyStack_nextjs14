import mongoose from "mongoose";

let isConnected: boolean = false;



export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);


  if (!process.env.MONGODB_URL) {
    return console.log('Missing MONGODB URL');
  }
  if (!isConnected) {
    return console.log('MongoDB is already connected');
  }
  const options = { serverSelectionTimeoutMS: 30000 }
  try {
    await mongoose.connect(process.env.MONGODB_URL,
      // { dbName: 'why_stack', },
      options);

    isConnected = true;

    console.log('monoDB is connected');
  } catch (error: any) {
    console.log("MongoDb connection failed", error);
  }
}