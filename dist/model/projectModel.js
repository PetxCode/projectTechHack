"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectModel = new mongoose_1.default.Schema({
    url: {
        type: String,
    },
    title: {
        type: String,
    },
    stack: {
        type: String,
    },
    task: {
        type: String,
    },
    motivation: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "comments",
        },
    ],
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("projects", projectModel);
