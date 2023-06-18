import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // extract token from header
  req.user = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: req.user.id });
  // console.log(user)
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden." });
  }
};
