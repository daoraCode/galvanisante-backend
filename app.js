require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT

// HTTP requst loggers
const morgan = require("morgan")
app.use(morgan("combined"))

app.get("/", (req, res) => {
  console.log("Hello, world")
})

// server running port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
