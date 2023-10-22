import mongoose from "mongoose";

interface iFollow {
  userID: string;
  user: {};
}

interface iFollowData extends iFollow, mongoose.Document {}

const followModel = new mongoose.Schema<iFollowData>(
  {
    userID: {
      type: String,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iFollowData>("followers", followModel);
