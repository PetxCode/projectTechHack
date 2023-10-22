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
exports.readAllProject = exports.readProject = exports.createunFollow = exports.createunFollowing = exports.createFollow = exports.createFollowMain = void 0;
const statusCode_1 = require("../utils/statusCode");
const userModel_1 = __importDefault(require("../model/userModel"));
const projectModel_1 = __importDefault(require("../model/projectModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const followModel_1 = __importDefault(require("../model/followModel"));
const followingModel_1 = __importDefault(require("../model/followingModel"));
const createFollowMain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friend = yield userModel_1.default.findById(friendID);
        console.clear();
        const createFollow = yield followModel_1.default.create({
            userID: friendID,
            user,
        });
        const createFollowing = yield followingModel_1.default.create({
            userID: userID,
            user,
        });
        user.following.push(new mongoose_1.default.Types.ObjectId(createFollowing._id));
        user.save();
        friend.follower.push(new mongoose_1.default.Types.ObjectId(createFollow._id));
        friend.save();
        return res.status(statusCode_1.statusCode.OK).json({
            message: "you are now follwing!",
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
            data: error,
        });
    }
});
exports.createFollowMain = createFollowMain;
const createFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield userModel_1.default.findById(friendID).populate({
            path: "follower",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        if (friend.follower.some((el) => el.userID === friendID)) {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "user doesn't exist",
            });
        }
        else {
            (0, exports.createFollowMain)(req, res);
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.createFollow = createFollow;
const createunFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friend = yield userModel_1.default.findById(friendID);
        if (user && friend) {
            const friendData = yield followModel_1.default.findOneAndDelete({ friendID });
            const userData = yield followModel_1.default.findOneAndDelete({ userID });
            user.following.pull(new mongoose_1.default.Types.ObjectId(friendID));
            user.save();
            friend.follower.pull(new mongoose_1.default.Types.ObjectId(userID));
            friend.save();
            return res.status(statusCode_1.statusCode.OK).json({
                message: "you are no more following!",
            });
        }
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "user doesn't exist",
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
            data: error,
        });
    }
});
exports.createunFollowing = createunFollowing;
const createunFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.body;
        const friend = yield userModel_1.default.findById(userID);
        console.log(friend);
        if (friend === null || friend === void 0 ? void 0 : friend.follower.some((el) => el.userID === userID)) {
            return res.status(200).json({
                message: "State",
            });
        }
        else {
            res.status(200).json({
                message: "hmmm",
            });
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
            data: error,
        });
    }
});
exports.createunFollow = createunFollow;
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
