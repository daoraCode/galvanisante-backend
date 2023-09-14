import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie'

import User from '../models/User.js'

export const signUp = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(12) // encrypt
    const hash = await bcrypt.hash(password, salt) // hash password to keep it secure
    req.body.password = hash // password hashed

    const newUser = new User()
    newUser.username = req.body.username
    newUser.email = req.body.email
    newUser.password = hash
    console.log(newUser)
    await newUser.save()

    res.status(201).json({
      success: true,
      message: 'User created succesfully.',
      createdUser: newUser,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed creating user.',
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
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1800s',
      })
      res
        .setHeader('Set-Cookie', serialize('accessToken', token))
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 3600000,
        })
        .json({ id: user.id, user: user.username, token: token })
    }
  } catch (error) {
    res.status(400).json({ err: 'Error occurred.' })
  }
}
