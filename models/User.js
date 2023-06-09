import { Schema, model } from "mongoose";

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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 4,
      max: 9,
    },
    role: {
      type: String,
      default: "user",
    },
    // bookmarks: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    weekly: [
      {
        type: String, // edit this property soon to make a relation
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
