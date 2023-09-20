import express from "express";
import cookieParser from "cookie-parser"
import { signUp, logIn } from '../controllers/auth.controller.js'
import { verifyExistingUser } from '../middlewares/isUser.js'
import { isAuth } from '../middlewares/isAuth.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const userRouter = express.Router()
const app = express()
app.use(cookieParser())

userRouter.post('/auth/signup', verifyExistingUser, signUp)
userRouter.post('/auth/login', logIn)

userRouter.get('/auth/me', (req, res) => {
  try {
    const { token } = req.cookies
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Missing JWT' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.json({
      success: true,
      message: 'User prrofile found',
      profile: decoded,
    })
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: 'JWT verification failed' })
  }
})

// route used to disconnect / stop user's session
userRouter.post('/auth/logout', (req, res) => {
  res.clearCookie('token') // clears actual token stored from client side
  res.status(200).json({ message: 'User Logged Out' })
})

export default userRouter;
