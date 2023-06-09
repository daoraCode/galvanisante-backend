import express from "express";
const app = express();

import morgan from "morgan";
import dotenv from "dotenv";
import connectDatabase from "./config/dbConfig.js";
import cors from "cors";
import userRouter from "./routes/users.js";
import movieRouter from "./routes/movies.js";

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

// Routes and other configurations
// app.get("/test", (req, res) => {
//   console.log("Hello");
// });

// routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
