import { Router } from "express";
import { signUp, logIn } from "../controllers/authController.js";

import { verifyExistingUser } from "../middlewares/users.js";

// router
const userRouter = Router();

// route implemented for users
// @POST
userRouter.post("/register", verifyExistingUser, signUp);
userRouter.post("/login", logIn);

export default userRouter;
