import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { statusCode } from "../utils/statusCode";
import userModel from "../model/userModel";
import crypto from "crypto";
import { verifiedEmail } from "../utils/email";
import { streamUpload } from "../utils/stream";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, userName } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(10).toString("hex");

    const user = await userModel.create({
      email,
      userName,
      password: hashed,
      token,
      verify: false,
    });

    verifiedEmail(user).then(() => {
      console.log("done");
    });

    return res.status(statusCode.CREATED).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      if (user.token !== "") {
        await userModel.findByIdAndUpdate(
          userID,
          {
            token: "",
            verify: true,
          },
          { new: true }
        );

        return res.status(statusCode.CREATED).json({
          message: "Account verified",
        });
      } else {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "user haven't been verified",
        });
      }
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

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);

      if (passwordCheck) {
        if (user.verify && user.token === "") {
          const token = jwt.sign(
            { id: user._id, email: user.email },
            "thisIsAwesome"
          );

          return res.status(statusCode.CREATED).json({
            message: "welcome back",
            data: token,
          });
        } else {
          return res.status(statusCode.BAD_REQUEST).json({
            message: "user haven't been verified",
          });
        }
      } else {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "password is incorrect",
        });
      }
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

export const readAllUser = async (req: Request, res: Response) => {
  try {
    const user: any = await userModel.find();

    return res.status(statusCode.CREATED).json({
      message: "viewing all users",
      data: user,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readUserByClass = async (req: Request, res: Response) => {
  try {
    const { classSet } = req.body;
    const user: any = await userModel.find({ classSet });

    return res.status(statusCode.CREATED).json({
      message: "viewing all users",
      data: user,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user: any = await userModel.findById(userID);

    return res.status(statusCode.CREATED).json({
      message: "viewing all users",
      data: user,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const updateOneUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user: any = await userModel.findById(userID);

    if (user && req) {
      const { secure_url, public_id }: any = await streamUpload(req);
      const mainUser = await userModel.findByIdAndUpdate(
        userID,
        {
          avatar: secure_url,
          avtarID: public_id,
        },
        { new: true }
      );

      return res.status(statusCode.CREATED).json({
        message: "viewing all users",
        data: mainUser,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "No User",
      });
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
      data: error.message,
    });
  }
};

export const updateOneUserName = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { userName, classSet, bio } = req.body;

    const user: any = await userModel.findById(userID);

    if (user) {
      const mainUser = await userModel.findByIdAndUpdate(
        userID,
        {
          userName,
          classSet,
          bio,
        },
        { new: true }
      );

      return res.status(statusCode.CREATED).json({
        message: "viewing all users",
        data: mainUser,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "No User",
      });
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
      data: error.message,
    });
  }
};
