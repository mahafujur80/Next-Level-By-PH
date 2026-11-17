import { Router } from "express";
import { usersController } from './user.controller';

const router = Router();

// api/v1/users
router.post("/", usersController.createUser);
router.get("/", usersController.getAllUser )
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById)
router.delete("/:id", usersController.deleteUser)

export const userRoutes = router;