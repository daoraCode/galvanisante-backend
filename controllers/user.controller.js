import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// token for users created after registering process
// const generateAccessToken = (username) => {
//   return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "30s" });
// };

export const signup = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!(email && password)) {
    //   return res
    //     .status(401)
    //     .json({ message: "Required email and password for login." });
    // }

    // verify if user exists
    // const foundUser = await User.findOne({ email });
    // if (!foundUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already exists.",
    //   });
    // }

    // if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    //   const token = generateAccessToken({ email });
    //   return res.status(200).json({
    //     success: true,
    //     message: "Logged In succesfully.",
    //     data: token,
    //   });
    // }
    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Password does not match." });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "55s",
    });

    return res
      .status(200)
      .json({ success: true, message: "login successful", data: token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error on log In.",
      error: err.message,
    });
  }
};

const getInfo = async (req, res) => {};
