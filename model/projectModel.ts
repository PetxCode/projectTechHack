import mongoose from "mongoose";

interface iProject {
  url: string;
  title: string;
  task: string;
  motivation: string;
  stack: string;

  avatar: string;
  avatarID: string;

  comments: Array<string>;
  user: {};
}

interface iProjectData extends iProject, mongoose.Document {}

const projectModel = new mongoose.Schema<iProjectData>(
  {
    url: {
      type: String,
    },

    title: {
      type: String,
    },

    stack: {
      type: String,
    },

    task: {
      type: String,
    },

    motivation: {
      type: String,
    },

    avatar: {
      type: String,
    },

    avatarID: {
      type: String,
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],

    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iProjectData>("projects", projectModel);
