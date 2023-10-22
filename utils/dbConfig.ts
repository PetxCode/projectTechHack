import mongoose from "mongoose";

const URL: string = "mongodb://127.0.0.1:27017/PLPDB";

export const connectDB = async () => {
  await mongoose.connect(URL);
};
