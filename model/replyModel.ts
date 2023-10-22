import mongoose from "mongoose";

interface iReply {
  title: string;
  userID: string;

  comment: {};
}

interface iReplyData extends iReply, mongoose.Document {}

const replyModel = new mongoose.Schema<iReplyData>(
  {
    title: {
      type: String,
    },
    userID: {
      type: String,
    },

    comment: {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iReplyData>("replies", replyModel);
