import { Router } from "express";
import { signup, login } from "../controllers/user.controller.js";

import { verifyExistingSubscriber } from "../middlewares/isSubscriber.js";

// router
const userRouter = Router();

userRouter.post("/register", verifyExistingSubscriber, signup);
userRouter.post("/login", login);

export default userRouter;
