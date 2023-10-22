import mongoose from "mongoose";
import projectModel from "../model/projectModel";
import userModel from "../model/userModel";
import { statusCode } from "../utils/statusCode";
import { Request, Response } from "express";
import commentModel from "../model/commentModel";
import replyModel from "../model/replyModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userID, projectID } = req.params;
    const { title } = req.body;

    const user: any = await userModel.findById(userID);
    const project: any = await projectModel.findById(projectID);

    if (user) {
      const comment: any = await commentModel.create({
        title,
        userID: user._id,
        user,
      });

      project?.comments.push(new mongoose.Types.ObjectId(comment._id!));
      project.save();

      return res.status(statusCode.CREATED).json({
        message: "comment created",
        data: project.comments,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "user doesn't exist",
      });
    }
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readComment = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;

    const projects: any = await projectModel.findById(projectID).populate({
      path: "comments",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(statusCode.CREATED).json({
      message: "project comment viewed",
      data: projects.comments,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const createCommentReply = async (req: Request, res: Response) => {
  try {
    const { userID, projectID, commentID } = req.params;
    const { title } = req.body;

    const user: any = await userModel.findById(userID);
    const project: any = await commentModel.findById(commentID);

    if (user) {
      const comment: any = await replyModel.create({
        title,
        userID: user._id,
        user,
      });

      project?.reply.push(new mongoose.Types.ObjectId(comment._id!));
      project.save();

      return res.status(statusCode.CREATED).json({
        message: "comment created",
        data: project.comments,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "user doesn't exist",
      });
    }
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readCommentReply = async (req: Request, res: Response) => {
  try {
    const { commentID } = req.params;

    const projects: any = await commentModel.findById(commentID).populate({
      path: "reply",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(statusCode.CREATED).json({
      message: "project comment viewed",
      data: projects.reply,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
