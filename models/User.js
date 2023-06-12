import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 10,
      required: true,
      unique: true,
    },
    usertag: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 4,
      max: 9,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    weeklies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Weekly",
      },
    ],
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// user model
const User = model("User", userSchema);
export default User;
