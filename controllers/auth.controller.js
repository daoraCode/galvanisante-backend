import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import cookieParser from "cookie-parser";

// import

export const signUp = async (req, res) => {
  try {
    // hash password
    const password = req.body.password
    const salt = await bcrypt.genSalt(12) // encryptment
    const hash = await bcrypt.hash(password, salt) // hash
    req.body.password = hash // password hashed

    const newUser = new User()
    newUser.username = req.body.username
    newUser.email = req.body.email
    // !!
    newUser.password = hash
    // !!
    console.log(newUser)
    await newUser.save()

    res.status(201).json({
      success: true,
      message: "User created succesfully.",
      createdUser: newUser,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed creating user.",
      error: err.message,
    })
  }
}

export const logIn = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      // login
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2000s",
      })
      res
        .cookie("token", token)
        .json({ id: user.id, user: user.username, token: token })
    }
  } catch (error) {
    res.status(400).json({ err: "Error occurred." })
  }
}

// export const getMe = async (req, res) => {
//   if (req.user) {
//     console.log(req.user)
//     res.json(req.user)
//   } else {
//     res.status(401).json({ error: "Unauthorized." })
//   }
// }

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
