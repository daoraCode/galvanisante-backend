import { Router } from "express";
import { signUp, logIn } from "../controllers/authController.js";

// router
const userRouter = Router();

// route implemented for users
// @POST
userRouter.post("/register", signUp);
userRouter.post("/login", logIn);

export default userRouter;
