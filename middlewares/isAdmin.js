// import jwt from "jsonwebtoken";

import User from "../models/User.js";
export const verifyExistingAdminUser = async (req, res, next) => {
  // const { username } = req.body;

  const admin = await User.findOne(req.body.email);

  if (admin) {
    res.status(409).json({ message: "User already exists." });
  } else {
    next();
  }
};

export const isAdmin = async (req, res, next) => {
  verifyExistingAdminUser();
  if (req.admin.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
// export const isAuthenticated = async (req, res, next) => {
//   if (req.user) {
//     console.log(req.user);
//     next();
//   } else {
//     res.status(401).json({ error: "Unauthorized. Not allowed." });
//   } j
// };

// export const isAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]; // extract token from header
//     req.user = await jwt.verify(token, process.env.TOKEN_SECRET); // verify token
//     next(); // move to the next function/middleware
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ message: "Authentication failed. Invalid token." });
//   }
// };
