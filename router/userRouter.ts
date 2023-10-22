import { Router } from "express";
import {
  createUser,
  readAllUser,
  readOneUser,
  signInUser,
  updateOneUser,
  updateOneUserName,
  verifyUser,
} from "../controller/authController";
import multer from "multer";
const upload = multer().single("avatar");

const router = Router();

router.route("/one-user/:userID").get(readOneUser);
router.route("/all-user").get(readAllUser);

router.route("/sign-user").post(signInUser);
router.route("/create-user").post(createUser);
router.route("/verify-user/:userID").get(verifyUser);

router.route("/update-one-user/:userID").patch(upload, updateOneUser);
router.route("/update-one-user-info/:userID").patch(updateOneUserName);

export default router;
