import express from "express";
const app = express();

import morgan from "morgan";
import dotenv from "dotenv";
import connectDatabase from "./config/dbConfig.js";
import cors from "cors";

// routes
import userRouter from "./routes/users.routes.js";
import movieRouter from "./routes/movies.routes.js";
import weeklyRouter from "./routes/weeklies.routes.js";

// load environment variables
dotenv.config();

// port
const PORT = process.env.PORT || 5000;

// connect to database
connectDatabase();

// middleware
app.use(
  cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false, limit: "40mb" }));

// routes
app.use("/api/user", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/weeklies", weeklyRouter);

// server port
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
