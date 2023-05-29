const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 10,
      required: true,
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
      min: 5,
      max: 9,
    },
    role: {
      type: String,
      required: true,
      max: 9,
    },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// creation of model for a user
const User = model("User", UserSchema);

module.exports = User;
