import jwt from "jsonwebtoken";
import User from "../models/User.js";

// will allow us to check if user already in db with the defined email
export const verifyExistingUser = async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    res.status(409).json({
      success: false,
      message: "User already exists.",
      user: user,
    });
  } else {
    next();
  }
};

export const isAuthenticated = async (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res.status(401).json({ error: "Unauthorized. Not allowed." });
  }
};

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extract token from header
    req.user = await jwt.verify(token, process.env.TOKEN_SECRET); // verify token
    next(); // move to the next function/middleware
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Authentication failed. Invalid token." });
  }
};

// resources and private documents are allowed only for admin
// this middleware will grant access to every operations on db
///////
// const { email } = req.body;
// console.log("24 toto :", req.body);
// const userAdmin = await User.findOne({ email });
// console.log({ email });
// console.log({ userAdmin });
/////
