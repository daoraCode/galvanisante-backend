import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

import { verifyExistingSubscriber } from "../middlewares/isUser.js";
import { isAuth } from "../middlewares/isAuth.js";

const userRouter = Router();

// @POST
userRouter.post("/register", verifyExistingSubscriber, signup);
userRouter.post("/login", login);

// @PUT
// userRouter.put("/update/", updateDate)

// server session disconnect process
userRouter.post("/logout", isAuth, logout);

export default userRouter;
