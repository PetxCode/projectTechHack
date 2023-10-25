import mongoose from "mongoose";

interface iUser {
  email: string;
  password: string;
  userName: string;
  verify: boolean;
  token: string;
  avatar: string;
  avatarID: string;

  bio: string;
  classSet: string;

  follower: Array<string>;
  followering: Array<string>;
  following: Array<string>;
  projects: Array<string>;
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },

    userName: {
      type: String,
    },

    password: {
      type: String,
    },

    verify: {
      type: Boolean,
    },

    token: {
      type: String,
    },

    bio: {
      type: String,
    },

    classSet: {
      type: String,
    },

    avatar: {
      type: String,
    },

    avatarID: {
      type: String,
    },

    follower: [
      {
        type: mongoose.Types.ObjectId,
        ref: "followers",
      },
    ],

    followering: [
      {
        type: mongoose.Types.ObjectId,
        ref: "followerings",
      },
    ],

    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "followings",
      },
    ],

    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "projects",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
