import { Router } from "express";
import {
  signUp,
  logIn,
  getMe,
  logOut,
} from "../controllers/auth.controller.js";

import { verifyExistingUser } from "../middlewares/isUser.js";
import { isAuth } from "../middlewares/isAuth.js";

const userRouter = Router();

// POST
userRouter.post("/auth/signup", verifyExistingUser, signUp);
userRouter.post("/auth/login", logIn);

// GET
userRouter.get("/me", isAuth, getMe);

// server session disconnection process
userRouter.post("/auth/logout", isAuth, logOut);

export default userRouter;
