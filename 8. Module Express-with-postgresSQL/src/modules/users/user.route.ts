import { Router } from "express";
import { usersController } from "./user.controller";

const router = Router();

// api/v1/users
router.post("/", usersController.createUser);

export const userRoutes = router;