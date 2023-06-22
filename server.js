import express from "express";
const app = express();

// enable to parse browser cookie data for token informations
import cookieParser from "cookie-parser";

import morgan from "morgan";
import dotenv from "dotenv";
import connectDatabase from "./config/dbConfig.js";

// enable domain communication
import cors from "cors";

// routes
import userRouter from "./routes/users.routes.js";
import movieRouter from "./routes/movies.routes.js";
import memoryRouter from "./routes/memory.routes.js";
// uplaod images
import multer from "multer";

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

// acces path to directory public
app.use(express.static("public"));
const upload = multer({ dest: "public/uploads/" });

// morgan
app.use(morgan("tiny"));

// app.use(express.json({ limit: "40mb" })
app.use(express.json());
// app.use(express.urlencoded());

app.use(cookieParser());

// routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/memories", memoryRouter);

// server port
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
