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
exports.updateOneUserName = exports.updateOneUser = exports.readOneUser = exports.readAllUser = exports.signInUser = exports.verifyUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCode_1 = require("../utils/statusCode");
const userModel_1 = __importDefault(require("../model/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const stream_1 = require("../utils/stream");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const token = crypto_1.default.randomBytes(10).toString("hex");
        const user = yield userModel_1.default.create({
            email,
            userName,
            password: hashed,
            token,
            verify: false,
        });
        (0, email_1.verifiedEmail)(user).then(() => {
            console.log("done");
        });
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "created",
            data: user,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.createUser = createUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            if (user.token !== "") {
                yield userModel_1.default.findByIdAndUpdate(userID, {
                    token: "",
                    verify: true,
                }, { new: true });
                return res.status(statusCode_1.statusCode.CREATED).json({
                    message: "Account verified",
                });
            }
            else {
                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                    message: "user haven't been verified",
                });
            }
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
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
            if (passwordCheck) {
                if (user.verify && user.token === "") {
                    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, "thisIsAwesome");
                    return res.status(statusCode_1.statusCode.CREATED).json({
                        message: "welcome back",
                        data: token,
                    });
                }
                else {
                    return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                        message: "user haven't been verified",
                    });
                }
            }
            else {
                return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                    message: "password is incorrect",
                });
            }
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
exports.signInUser = signInUser;
const readAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "viewing all users",
            data: user,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readAllUser = readAllUser;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "viewing all users",
            data: user,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.readOneUser = readOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user && req) {
            const { secure_url, public_id } = yield (0, stream_1.streamUpload)(req);
            const mainUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                avatar: secure_url,
                avtarID: public_id,
            }, { new: true });
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "viewing all users",
                data: mainUser,
            });
        }
        else {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "No User",
            });
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.updateOneUser = updateOneUser;
const updateOneUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { userName } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const mainUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                userName,
            }, { new: true });
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "viewing all users",
                data: mainUser,
            });
        }
        else {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "No User",
            });
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.updateOneUserName = updateOneUserName;
