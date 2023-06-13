import express from "express";
const app = express();

import cookieParser from "cookie-parser";

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
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false, limit: "40mb" }));
app.use(cookieParser());

// Routes and other configurations
// app.get("/test", (req, res) => {
//   console.log("Hello");
// });

// routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/weeklies", weeklyRouter);

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Headers", "NewUser=true");
  res.cookie("New user", true);
  res.send("you've got cookies");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
