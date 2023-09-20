import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('Invalid or missing Authorization header')
    }
    const token = authorizationHeader.split(' ')[1]
    req.user = await jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token:', token)
    next()
  } catch (err) {
    console.error(err)
    res.status(403).json({ error: 'Unauthorized' })
  }
}