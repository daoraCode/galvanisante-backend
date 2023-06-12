import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";

import { verifyExistingSubscriber } from "../middlewares/isSubscriber.js";

// router
const userRouter = Router();

// @POST
userRouter.post("/register", verifyExistingSubscriber, signup);
userRouter.post("/login", login);



export default userRouter;
