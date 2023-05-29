const express = require("express");
const app = express();
// const bodyParser = require("body-parser"); no need in later express version of application
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dbConfig.js");
const cors = require("cors");

// Load environment variables
dotenv.config();

// port
const port = process.env.PORT || 5000;

// Connect to the database
connectDatabase();

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false, limit: "40mb" }));

// Routes and other configurations
// ...

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
