import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import user from "./router/userRouter";
import project from "./router/projectRouter";
import comment from "./router/commentRouter";

export const mainApp = (app: Application) => {
  app.use("/", user);
  app.use("/", project);
  app.use("/", comment);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(statusCode.OK).json({
        message: "Welcome to this API",
      });
    } catch (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Error",
      });
    }
  });
};
