const { Schema, model } = require("mongoose");

const movieSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    moviePicture: {
      type: String,
      required: true,
    },
    released: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// movie model
const Movie = model("Movie", movieSchema);
module.exports = Movie;
