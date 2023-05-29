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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 9,
    },
    // password: {
    //   type: String,
    //   required: true,
    //   max: 9,
    // },
    token: String,
  },
  {
    timestamps: true,
  }
);

// creation of model for a user
const User = model("User", UserSchema);

module.exports = User;
