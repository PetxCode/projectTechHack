import { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import userModel from "../model/userModel";
import projectModel from "../model/projectModel";
import mongoose from "mongoose";
import { streamUpload } from "../utils/stream";

export const createProject = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, stack, motivation, url, task } = req.body;

    const user: any = await userModel.findById(userID);

    const { secure_url, public_id }: any = await streamUpload(req);

    if (user) {
      const project: any = await projectModel.create({
        title,
        motivation,
        url,
        task,
        stack,

        avatar: secure_url,
        avatarID: public_id,
        user,
      });

      user?.projects.push(new mongoose.Types.ObjectId(project._id!));

      user.save();

      return res.status(statusCode.CREATED).json({
        message: "project created",
        data: project,
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

export const deleteProject = async (req: any, res: Response) => {
  try {
    const { userID, projectID } = req.params;

    const user: any = await userModel.findById(userID);

    if (user) {
      const project: any = await projectModel.findByIdAndDelete(projectID);

      user?.projects.pull(new mongoose.Types.ObjectId(project._id!));

      user.save();
      return res.status(statusCode.CREATED).json({
        message: "project delete",
        data: project,
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

export const readOneProject = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;

    const projects: any = await projectModel.findById(projectID);

    return res.status(statusCode.OK).json({
      message: "project read",
      data: projects,
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
