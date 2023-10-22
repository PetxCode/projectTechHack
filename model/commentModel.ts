import mongoose from "mongoose";

interface iComment {
  title: string;
  userID: string;

  reply: Array<string>;
  project: {};
}

interface iCommentData extends iComment, mongoose.Document {}

const commentModel = new mongoose.Schema<iCommentData>(
  {
    title: {
      type: String,
    },

    userID: {
      type: String,
    },

    reply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "replies",
      },
    ],

    project: {
      type: mongoose.Types.ObjectId,
      ref: "projects",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iCommentData>("comments", commentModel);
