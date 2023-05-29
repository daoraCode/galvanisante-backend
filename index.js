const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const mongoose = require("./config/dbConfig.js");
const cors = require("cors");
const port = process.env.PORT || 5000;

// morgan
app.use(morgan("tiny"));

app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false, limit: "40mb" }));

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
