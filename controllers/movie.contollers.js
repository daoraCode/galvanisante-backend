import Movie from "../models/Movies.js";

export const createMovie = async (req, res) => {
  const { title, released, genre, overview, publisher } = req.body;

  if (!title || !released || !genre || !overview || !publisher) {
    return res
      .status(401)
      .json({ error: "Missing datas. All fields are mandatory." });
  }

  // avoid duplicate movie by cheking the title
  const existingMovie = await Movie.findOne({
    title: title,
  });
  if (existingMovie) {
    return res.status(403).json({
      error: "Movie already exists.",
      existingMovie: existingMovie.title,
    });
  }

  try {
    // const newMovie = await Movie.create({
    //   ...req.body,
    // });

    // create a new Movie
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.status(201).json({
      success: true,
      message: "Created movie succesfully.",
      createdMovie: newMovie,
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
  const { _id } = req.params;
  try {
    const movie = await Movie.findById({ _id: _id });
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
  try {
    await Movie.findOneAndDelete({ _id: id });
    res
      .status(204)
      .send({ success: true, message: "Resource deleted succesfully." });
  } catch (err) {
    res.status(410).json({
      success: false,
      message: "Resource already deleted.",
      error: err.message,
    });
  }
};

