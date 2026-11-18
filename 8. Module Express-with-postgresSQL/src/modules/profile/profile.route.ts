import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

// api/v1/profile

router.post('/', profileController.createProfile)


export const profileRouter = router;