import express from "express";
const app = express()
import morgan from "morgan"
import dotenv from "dotenv"
import connectDatabase from "./config/dbConfig.js"
import cors from 'cors'
import userRouter from './routes/users.routes.js'
import memoryRouter from './routes/memory.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 5000

connectDatabase()

app.use(
  cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/uploads', express.static('uploads'))
app.use(morgan('tiny'))

// routes
app.use('/api/users', userRouter)
app.use('/api/memories', memoryRouter)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});