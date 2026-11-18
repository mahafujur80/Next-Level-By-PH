import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoutes } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";
const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// user router
app.use("/api/v1/users", userRoutes)

// profile
app.use("/api/v1/profile", profileRouter)


//* Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello this is express response",
    author: "munna bhai",
    data: req.body,
  });
});

export default app;