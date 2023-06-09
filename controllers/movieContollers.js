import Movie from "../models/Movie.js";

// middleware
// adminAuthentified

export const createMovie = async (req, res) => {
  try {
    const { title, poster, released, genre, summary, duration } = req.body;

    if (!(title, poster, released, genre, summary, duration)) {
      return res
        .status(400)
        .json({ success: false, message: "All movie's data are mandatory" });
    }

    const existingMovie = new Movie.findOne({ title });

    if (existingMovie) {
      return res
        .status(403)
        .json({ success: false, message: "Movie already exists" });
    }

    const newMovie = new Movie(req.body);
    await newMovie.save();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating Movie.",
    });
  }
};
