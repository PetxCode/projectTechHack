import mongoose from "mongoose";

// const URL: string = "mongodb://127.0.0.1:27017/PLPDB";

const URL: string =
  "mongodb+srv://PeterPan:PeterPan@codelab.eqkgv.mongodb.net/PLPDB?retryWrites=true&w=majority";

export const connectDB = async () => {
  await mongoose.connect(URL);
};
