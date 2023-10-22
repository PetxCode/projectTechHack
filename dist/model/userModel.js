"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
    },
    verify: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    follower: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "followers",
        },
    ],
    followering: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "followerings",
        },
    ],
    following: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "followings",
        },
    ],
    projects: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "projects",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userModel);
