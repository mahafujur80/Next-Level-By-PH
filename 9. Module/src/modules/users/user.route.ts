import { Router } from "express";
import { usersController } from './user.controller';
import auth from "../../middleware/auth";
import { User_Role } from "../../types";

const router = Router();


// api/v1/users
router.post("/", usersController.createUser);
router.get("/", auth(User_Role.admin, User_Role.agent), usersController.getAllUser )
router.get("/:id",  auth(User_Role.admin, User_Role.agent, User_Role.user), usersController.getUserById);
router.patch("/:id", auth(User_Role.admin, User_Role.user) , usersController.updateUserById)
router.delete("/:id", usersController.deleteUser)

export const userRoutes = router;