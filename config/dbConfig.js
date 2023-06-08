const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = connectDatabase;
