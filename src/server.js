import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import projectRouter from "./routes/project.routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json())

app.use("", userRouter);
app.use("", tasksRouter);
app.use("", projectRouter);
app.use("", authRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})