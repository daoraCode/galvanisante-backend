import Movie from "../models/Movies.js";

// middleware
// adminAuthentified

export const createMovie = async (req, res) => {
  try {
    const existingMovie = await Movie.findOne({
      title: req.body.title,
    });

    if (existingMovie) {
      return res
        .status(403)
        .json({ success: false, message: "Movie already exists." });
    }
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.status(200).json({
      success: true,
      message: "Movie created succesfully.",
      movie: newMovie,
    });
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
  res.status(200).json({ success: true, movieList: movies });
};

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Movie retrieved succesfully.",
      movie: movie,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Not found movie.", err: err.message });
  }
};
