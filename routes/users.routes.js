import express from "express";
import {
  signUp,
  logIn,
  getMe,
  // logOut,
  // getProfile,
} from "../controllers/auth.controller.js";

import {
  isUserAuthenticated,
  verifyExistingUser,
} from "../middlewares/isUser.js";
import { isAuth } from "../middlewares/isAuth.js";

// jwt
import jwt from "jsonwebtoken";

// cookie-parser
import cookieParser from "cookie-parser";
import User from "../models/User.js";

const userRouter = express.Router();
const app = express();

app.use(cookieParser());

// POST
userRouter.post("/auth/signup", verifyExistingUser, signUp);
userRouter.post("/auth/login", logIn);

// user's profile
userRouter.get("/me", (req, res) => {
  const { token } = req.cookies;
  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    {},
    (err, info) => {
      if (err) throw err;
      res.json(info);
    }
  );
  // find one user
  // const registeredUser = User.find0ne({ email: email });
  // if (!registeredUser) {
  //   res.send(500);
  // } else {
  //   res.json(registeredUser);
  // }
  // res send le user
  res.json(verifyToken);
});

// server session disconnection process
// userRouter.post("/auth/logout", logOut);

userRouter.post("/auth/logout", (req, res) => {
  const { token } = req.cookies;
  res.cookie(token, "").json("Fine!");
});

export default userRouter;
