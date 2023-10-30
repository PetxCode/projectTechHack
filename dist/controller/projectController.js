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
exports.readAllProject = exports.readOneProject = exports.readProject = exports.deleteProject = exports.createProject = void 0;
const statusCode_1 = require("../utils/statusCode");
const userModel_1 = __importDefault(require("../model/userModel"));
const projectModel_1 = __importDefault(require("../model/projectModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const stream_1 = require("../utils/stream");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { title, githubURL, stack, motivation, url, task } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const { secure_url, public_id } = yield (0, stream_1.streamUpload)(req);
        if (user) {
            const project = yield projectModel_1.default.create({
                title,
                motivation,
                url,
                githubURL,
                task,
                stack,
                avatar: secure_url,
                avatarID: public_id,
                user,
            });
            user === null || user === void 0 ? void 0 : user.projects.push(new mongoose_1.default.Types.ObjectId(project._id));
            user.save();
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "project created",
                data: project,
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
exports.createProject = createProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, projectID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const project = yield projectModel_1.default.findByIdAndDelete(projectID);
            user === null || user === void 0 ? void 0 : user.projects.pull(new mongoose_1.default.Types.ObjectId(project._id));
            user.save();
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "project delete",
                data: project,
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
exports.deleteProject = deleteProject;
const readProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const projects = yield userModel_1.default.findById(userID).populate({
            path: "projects",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "project created",
            data: projects.projects,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readProject = readProject;
const readOneProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const projects = yield projectModel_1.default.findById(projectID);
        return res.status(statusCode_1.statusCode.OK).json({
            message: "project read",
            data: projects,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readOneProject = readOneProject;
const readAllProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectModel_1.default.find();
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "project viewed",
            data: projects,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readAllProject = readAllProject;
