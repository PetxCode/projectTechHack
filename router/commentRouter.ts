import { Router } from "express";
import {
  createComment,
  createCommentReply,
  readComment,
  readCommentReply,
} from "../controller/commentController";

const router = Router();

router.route("/create-comment/:userID/:projectID").post(createComment);
router.route("/read-comment/:projectID").get(readComment);

router.route("/create-reply/:userID/:commentID").post(createCommentReply);
router.route("/read-reply/:commentID").get(readCommentReply);

export default router;
