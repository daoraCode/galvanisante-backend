import Movie from "../models/Movies.js";

export const createMovie = async (req, res) => {
  const existingMovie = await Movie.findOne({
    title: req.body.title,
  });

  if (existingMovie) {
    return res.status(403).json({ error: "Movie already exists." });
  }

  try {
    const newMovie = await Movie.create({
      ...req.body,
    });
    res.status(201).json({
      success: true,
      message: "Created movie succesfully.",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred. Movie not created.",
      error: err.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    success: true,
    message: "Found movies succesfully.",
    movieList: movies,
  });
};

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Found movie succesfully.",
      movie: movie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error. Not found movie.",
      err: err.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await Movie.findOneAndDelete({ _id: id });
};

