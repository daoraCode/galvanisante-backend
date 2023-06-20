import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import cookieParser from "cookie-parser";

// import

export const signUp = async (req, res) => {
  try {
    // hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(12); // encryptment
    const hash = await bcrypt.hash(password, salt); // hash
    req.body.password = hash; // password hashed

    // creates a new user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created succesfully.",
      createdUser: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed creating user.",
      error: err.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!email || !password) {
    //   return res
    //     .status(401)
    //     .json({ error: "Required email and password for login." });
    // }

    // verify if user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists.",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect Password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1600s",
    });
    res.cookie("token", token).json("ok");
    // return res
    //   .status(200)
    //   .json({ success: true, message: "Login successful.", data: token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error on log in.",
      error: err.message,
    });
  }
};

export const getMe = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Unauthorized." });
  }
};

// logout
// export const logOut = (req, res) => {
//   // if ()
//   req.cookie("token", "").json("Fine!");
// };

// // profile
// export const getProfile = async (req, res) => {
//   const { token } = req.cookies;
//   const verifyToken = await jwt.verify('token', process.env.JWT_SECRET, {}, (err, info) => {
//     if (err) throw err;
//     res.json(verifyToken)
//   })
//   res.json(verifyToken)
// };
