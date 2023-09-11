import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 10,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 12,
      max: 50,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// user model
const User = model("User", userSchema);
export default User;
