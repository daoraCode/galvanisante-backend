const express = require("express");
const app = express();
// const bodyParser = require("body-parser"); no need in later express version of application
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dbConfig.js");
const cors = require("cors");

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
