import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

export default connectDatabase;
