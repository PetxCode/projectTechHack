import e, { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import userModel from "../model/userModel";
import projectModel from "../model/projectModel";
import mongoose from "mongoose";
import followModel from "../model/followModel";
import followingModel from "../model/followingModel";

export const createFollowMain = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await userModel.findById(userID);

    const friend: any = await userModel.findById(friendID);
    console.clear();

    const createFollow: any = await followModel.create({
      userID: friendID,
      user,
    });

    const createFollowing: any = await followingModel.create({
      userID: userID,
      user,
    });

    user.following.push(new mongoose.Types.ObjectId(createFollowing._id));
    user.save();

    friend.follower.push(new mongoose.Types.ObjectId(createFollow._id)!);
    friend.save();

    return res.status(statusCode.OK).json({
      message: "you are now follwing!",
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
      data: error,
    });
  }
};

export const createFollow = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const friend: any = await userModel.findById(friendID).populate({
      path: "follower",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    if (friend.follower.some((el: any) => el.userID === friendID)) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "user doesn't exist",
      });
    } else {
      createFollowMain(req, res);
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
      data: error.message,
    });
  }
};

export const createunFollowing = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await userModel.findById(userID);

    const friend: any = await userModel.findById(friendID);

    if (user && friend) {
      const friendData: any = await followModel.findOneAndDelete({ friendID });

      const userData: any = await followModel.findOneAndDelete({ userID });

      user.following.pull(new mongoose.Types.ObjectId(friendID));
      user.save();

      friend.follower.pull(new mongoose.Types.ObjectId(userID)!);
      friend.save();

      return res.status(statusCode.OK).json({
        message: "you are no more following!",
      });
    }

    return res.status(statusCode.BAD_REQUEST).json({
      message: "user doesn't exist",
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
      data: error,
    });
  }
};

export const createunFollow = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.body;

    const friend: any = await userModel.findById(userID);

    console.log(friend);

    if (friend?.follower.some((el: any) => el.userID === userID)) {
      return res.status(200).json({
        message: "State",
      });
    } else {
      res.status(200).json({
        message: "hmmm",
      });
    }
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
      data: error,
    });
  }
};

export const readProject = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const projects: any = await userModel.findById(userID).populate({
      path: "projects",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(statusCode.CREATED).json({
      message: "project created",
      data: projects.projects,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readAllProject = async (req: Request, res: Response) => {
  try {
    const projects: any = await projectModel.find();

    return res.status(statusCode.CREATED).json({
      message: "project viewed",
      data: projects,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
