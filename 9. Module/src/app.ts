import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import { userRoutes } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandle";
const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
// user router
app.use("/api/v1/users", userRoutes)
// profile
app.use("/api/v1/profile", profileRouter)
//auth
app.use("/api/v1/auth", authRoute)


//* Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello this is express response",
    author: "munna bhai",
    data: req.body,
  });
});

app.use(globalErrorHandler)

export default app;