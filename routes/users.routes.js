import express from "express";
import cookieParser from "cookie-parser"
import {
  signUp,
  logIn,
  // getMe,
  // logOut,
  // getProfile,
} from "../controllers/auth.controller.js"
import {
  isUserAuthenticated,
  verifyExistingUser,
} from "../middlewares/isUser.js"
import { isAuth } from "../middlewares/isAuth.js"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
// import { isAdmin } from "../middlewares/isAdmin.js"

const userRouter = express.Router()
const app = express()
app.use(cookieParser())

// POST
userRouter.post("/auth/signup", verifyExistingUser, signUp)
userRouter.post("/auth/login", logIn)

// user's profile
// userRouter.get("/auth/me", (req, res) => {
//   const { token } = req.cookies
//   const verifyToken = jwt.verify(
//     token,
//     process.env.JWT_SECRET,
//     {},
//     (err, info) => {
//       if (err) throw err
//       res.json({
//         success: true,
//         message: "Found user's profile",
//         profile: info,
//       })
//     }
//   )
// })

userRouter.get('/auth/me', async (req, res) => {
  try {
    const { token } = await req.cookies
    const info = await jwt.verify(token, process.env.JWT_SECRET)
    if (!info) {
      throw new Error('Info Not Found')
    }
    return res.json({
      success: true,
      message: 'Profile User Found',
      profile: info,
    })
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      success: false,
      message: 'Authentication Failed',
    })
  }
})

userRouter.post("/auth/logout", (req, res) => {
  res.clearCookie("token") // Clear jwt stored in cookie web browser
  res.status(200).json({ message: "Fine!" })
})


export default userRouter;
