"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCommentReply = exports.createCommentReply = exports.readComment = exports.createComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const projectModel_1 = __importDefault(require("../model/projectModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const statusCode_1 = require("../utils/statusCode");
const commentModel_1 = __importDefault(require("../model/commentModel"));
const replyModel_1 = __importDefault(require("../model/replyModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, projectID } = req.params;
        const { title } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const project = yield projectModel_1.default.findById(projectID);
        if (user) {
            const comment = yield commentModel_1.default.create({
                title,
                userID: user._id,
                user,
            });
            project === null || project === void 0 ? void 0 : project.comments.push(new mongoose_1.default.Types.ObjectId(comment._id));
            project.save();
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "comment created",
                data: project.comments,
            });
        }
        else {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "user doesn't exist",
            });
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.createComment = createComment;
const readComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const projects = yield projectModel_1.default.findById(projectID).populate({
            path: "comments",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "project comment viewed",
            data: projects.comments,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readComment = readComment;
const createCommentReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, projectID, commentID } = req.params;
        const { title } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const project = yield commentModel_1.default.findById(commentID);
        if (user) {
            const comment = yield replyModel_1.default.create({
                title,
                userID: user._id,
                user,
            });
            project === null || project === void 0 ? void 0 : project.reply.push(new mongoose_1.default.Types.ObjectId(comment._id));
            project.save();
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "comment created",
                data: project.comments,
            });
        }
        else {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "user doesn't exist",
            });
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.createCommentReply = createCommentReply;
const readCommentReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID } = req.params;
        const projects = yield commentModel_1.default.findById(commentID).populate({
            path: "reply",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "project comment viewed",
            data: projects.reply,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readCommentReply = readCommentReply;
