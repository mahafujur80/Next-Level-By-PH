import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
//  /api/v1/users
router.post('/', userController.createUser);
router.get("/", userController.getAllUser )
router.patch("/:id", userController.updateUser)

export const userRouter = router;