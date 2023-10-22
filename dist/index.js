"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = require("./utils/dbConfig");
const cors_1 = __importDefault(require("cors"));
const mainApp_1 = require("./mainApp");
const port = 2266;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.log();
    (0, dbConfig_1.connectDB)().then(() => {
        console.log("server is ready 🚀🚀🚀");
    });
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
