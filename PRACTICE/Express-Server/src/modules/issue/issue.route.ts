import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { User_Role } from "../../types";

const router = Router()
// api/v1/issue
router.post("/", auth(User_Role.contributor), issueController.createIssue);
router.get("/", auth(User_Role.contributor, User_Role.maintainer), issueController.getAllIssue);
router.patch("/:id", auth(User_Role.maintainer, User_Role.contributor), issueController.updateUserIssue)

export const issueRouter = router;