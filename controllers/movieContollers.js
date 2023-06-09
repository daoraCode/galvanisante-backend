import Movie from "../models/Movie.js";

// middleware
// adminAuthentified

export const createMovie = async (req, res) => {
  try {
    // const { title, poster, released, genre, summary, duration } = req.body;
    // if (!(title, poster, released, genre, summary, duration)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All datas are mandatory." });
    // }

    const existingMovie = await Movie.findOne({
      titleMovie: title,
    });

    if (existingMovie) {
      return res
        .status(403)
        .json({ success: false, message: "Movie already exists." });
    } else {
      const newMovie = new Movie(req.body);
      await newMovie.save();
    }

    res.status(200).json({
      success: true,
      message: "Movie creation succesfull.",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating movie.",
      error: err.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ success: true, movieList: movies });
}; 
