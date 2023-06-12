import Movie from "../models/Movies.js";

export const createMovie = async (req, res) => {
  // const existingMovie = await Movie.findOne({
  //   title: req.body.title,
  // });

  // if (existingMovie) {
  //   return res
  //     .status(403)
  //     .json({ success: false, message: "Movie already exists." });
  // }
  // await newMovie.save();
  try {
    const newMovie = await Movie.create({
      ...req.body,
    });
    res.json(newMovie);
    // res.status(200).json({
    //   success: true,
    //   message: "Movie has been created succesfully.",
    //   movie: newMovie,
    // });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred creating movie.",
      error: err.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    success: true,
    message: "Movies found succesfully.",
    movieList: movies,
  });
};

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Movie found succesfully.",
      movie: movie,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Not found movie.", err: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await Movie.findOneAndDelete({ _id: id });
};

