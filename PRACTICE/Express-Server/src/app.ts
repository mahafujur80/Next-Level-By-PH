import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandller";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from './modules/auth/auth.route';
import { issueRouter } from "./modules/issue/issue.route";
import logger from "./middleware/logger";

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(logger)


// user router
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/issue", issueRouter)


app.get("/", async(req:Request, res:Response)=>{
    res.status(200).json({
        success: true,
        message: "Hello Developer Your Server Is live......",
        author: "munna"
    })
})


// error handler
app.use(globalErrorHandler)
export default app;
