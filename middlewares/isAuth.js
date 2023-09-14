import express from 'express'
import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({
      message: 'Unauthorized',
    })
  } else {
    const token = authHeader?.split(' ')[1] // indicates either there's token or empty
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      req.user = user
      next()
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
