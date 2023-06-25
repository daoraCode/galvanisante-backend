import express from "express";
const app = express()
import morgan from "morgan"
import dotenv from "dotenv"
import connectDatabase from "./config/dbConfig.js"
import cors from "cors"
// routes
import userRouter from "./routes/users.routes.js"
import movieRouter from "./routes/movies.routes.js"
import memoryRouter from "./routes/memory.routes.js"
import cookieParser from "cookie-parser"
// uplaod images
// import multer from "multer";

// environment variables
dotenv.config()

// port
const PORT = process.env.PORT || 5000

// connect to database
connectDatabase()

// middleware
app.use(
  cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(morgan("tiny"))

  


// routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/memories", memoryRouter);

// server port
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});