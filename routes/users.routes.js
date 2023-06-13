import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

import { verifyExistingSubscriber } from "../middlewares/isSubscriber.js";

// router
const userRouter = Router();

// @POST
userRouter.post("/register", verifyExistingSubscriber, signup);
userRouter.post("/login", login);

// @PUT
// userRouter.put("/update/", updateDate)

// server session disconnect process
// userRouter.delete("/logout", logout);

export default userRouter;
