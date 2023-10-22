"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controller/projectController");
const followController_1 = require("../controller/followController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("avatar");
const router = (0, express_1.Router)();
router.route("/create-project/:userID").post(upload, projectController_1.createProject);
router.route("/read-project/:userID").get(projectController_1.readProject);
router.route("/read-one-project/:projectID").get(projectController_1.readOneProject);
router.route("/read-all-project").get(projectController_1.readAllProject);
router.route("/start-follow/:userID/:friendID").get(followController_1.createFollow);
router.route("/start-unfollow/:userID/:friendID").get(followController_1.createunFollow);
exports.default = router;
