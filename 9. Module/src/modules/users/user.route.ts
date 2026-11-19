import { Router } from "express";
import { usersController } from './user.controller';
import auth from "../../middleware/auth";

const router = Router();


// api/v1/users
router.post("/", usersController.createUser);
router.get("/", auth, usersController.getAllUser )
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById)
router.delete("/:id", usersController.deleteUser)

export const userRoutes = router;