import express, { Application } from "express";
import { connectDB } from "./utils/dbConfig";
import cors from "cors";
import { mainApp } from "./mainApp";

const port: number = 2266;
const app: Application = express();

app.use(express.json());
app.use(cors());

mainApp(app);

const server = app.listen(port, () => {
  console.log();
  connectDB().then(() => {
    console.log("server is ready 🚀🚀🚀");
  });
});

process.on("uncaughtException", (error: Error | any) => {
  console.log("uncaughtException: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: Error | any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
