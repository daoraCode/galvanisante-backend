import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { verifyExistingUser } from "../middlewares/auth.js";

// import { verifyExistingUser } from "../middlewares/auth.js";

// router
const userRouter = Router();

// route implemented for users
// @POST
userRouter.post("/register", verifyExistingUser, signup);
userRouter.post("/login", login);

export default userRouter;
