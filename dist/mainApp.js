"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const statusCode_1 = require("./utils/statusCode");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const projectRouter_1 = __importDefault(require("./router/projectRouter"));
const commentRouter_1 = __importDefault(require("./router/commentRouter"));
const mainApp = (app) => {
    app.use("/", userRouter_1.default);
    app.use("/", projectRouter_1.default);
    app.use("/", commentRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(statusCode_1.statusCode.OK).json({
                message: "Welcome to this API",
            });
        }
        catch (error) {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "Error",
            });
        }
    });
};
exports.mainApp = mainApp;
