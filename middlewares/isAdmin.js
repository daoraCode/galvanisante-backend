import User from "../models/User.js";
import jwt from "jsonwebtoken";

// for admin user

// export const verifyExistingAdminUser = async (req, res, next) => {
//   // main objective is to find email that's match with admin user accordingly
//   const { email } = req.body;
//   const admin = await User.findOne({ email }).exec();
//   if (admin) {
//     res.status(409).json({ message: "User already exists." });
//   } else {
//     next();
//   }
// };

export const isAdmin = async (req, res, next) => {
  // const { email } = req.body;
  const token = req.headers.authorization.split(" ")[1]; // extract token from header
  req.user = await jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findOne({ _id: req.user.id });
  console.log(user);
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
