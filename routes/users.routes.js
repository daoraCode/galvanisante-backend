import { Router } from "express";
import { signup, login } from "../controllers/user.controller.js";

import { verifyExistingUser } from "../middlewares/auth.js";

// router
const userRouter = Router();

userRouter.post("/register", verifyExistingUser, signup);
userRouter.post("/login", login);

export default userRouter;
