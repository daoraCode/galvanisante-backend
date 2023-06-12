import { Schema, model } from "mongoose";

const movieSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      default: "",
    },
    released: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.post("findOneAndDelete", async function (movie) {
  await model("User").findByIdAndUpdate(
    { _id: movie.publisher },
    { $pull: { movies: movie._id } }
  );
});

movieSchema.post("save", async function (movie) {
  await model("User").findByIdAndUpdate(
    { _id: movie.publisher },
    { $push: { movies: movie._id } }
  );
});

// movie model
const Movie = model("Movie", movieSchema);
export default Movie;
