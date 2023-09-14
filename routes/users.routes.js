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

userRouter.get('/auth/me', isAuth, (req, res) => {
  const { token } = req.cookies
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
    if (err) throw err
    res.status(200).json({
      status: 'success',
      message: 'Logged User',
      user: info,
    })
  })
})

// route used to disconnect / stop user's session
userRouter.post('/auth/logout', (req, res) => {
  res.clearCookie('token') // clears actual token stored from client side
  res.status(200).json({ message: 'User Logged Out' })
})

export default userRouter;
