import mongoose from "mongoose";
import { MONGO_URI } from "./env";

type callback = (app) => Promise<void> | void;

export async function connectDb(app, callback: callback) {
  if (!MONGO_URI) {
    throw new Error(`MongoDB URI is not provided`);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database has been connected...");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.log(`Error durring database connection`, error);
  }

  callback(app);
}
