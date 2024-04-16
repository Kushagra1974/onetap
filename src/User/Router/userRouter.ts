import { Router } from "express";
import { basicInfoController } from "../Controllers/basicInfo";
import { profileInfoController } from "../Controllers/profileData";
import { getUserIdController } from "../Controllers/userIdController";

export const userRouter = Router()

userRouter.get("/basic-info/:userId",basicInfoController)

userRouter.get("/profile-data/:userId",profileInfoController)

userRouter.get('/:authId', getUserIdController);
