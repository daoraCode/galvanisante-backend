import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 9,
      required: true,
      unique: true,
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
      min: 7,
      max: 9,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
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
