import { Router } from "express";
import {
  createProject,
  deleteProject,
  readAllProject,
  readOneProject,
  readProject,
} from "../controller/projectController";
import {
  createFollow,
  createunFollow,
  createunFollowing,
} from "../controller/followController";
import multer from "multer";
const upload = multer().single("avatar");

const router = Router();

router.route("/create-project/:userID").post(upload, createProject);

router.route("/delete-project/:userID/:projectID").post(deleteProject);

router.route("/read-project/:userID").get(readProject);

router.route("/read-one-project/:projectID").get(readOneProject);

router.route("/read-all-project").get(readAllProject);

router.route("/start-follow/:userID/:friendID").get(createFollow);
router.route("/start-unfollow/:userID/:friendID").get(createunFollow);

export default router;
