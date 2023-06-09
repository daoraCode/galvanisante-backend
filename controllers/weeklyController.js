import Weekly from "../models/Weekly";

// middleware
// adminAuthentified

export const createWeekly = async (req, res) => {
  try {
    const existingWeekly = await Weekly.findOne({
      mainTitle: req.body.mainTitle,
    });

    if (existingWeekly) {
      return res.status(403).json({
        success: false,
        message: "Weekly already exists.",
        error: err.message,
      });
    }

    const newWeekly = await new Weekly(req.body);
    await newWeekly.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred creating weekly.",
      error: err.message,
    });
  }
};
