import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// token for users created after registering process
const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "5s" });
};

export const signUp = async (req, res) => {
  try {
    // middleware (verifynigUser)

    // hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(12); // encryptment
    const hash = await bcrypt.hash(password, salt); // hash
    req.body.password = hash; // password hashed

    // creates a new user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "New user created succesfully.",
      newSubscriber: newUser,
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

    if (!(email && password)) {
      return res
        .status(401)
        .json({ message: "Required email and password for login." });
    }

    // verify if user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const token = generateAccessToken({ email });
      return res.status(200).json({
        success: true,
        message: "Logged In succesfully.",
        data: token,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error on log In.",
      error: err.message,
    });
  }
};
