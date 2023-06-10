import Weekly from "../models/Weekly.js";

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
      });
    }

    const newWeekly = await new Weekly(req.body);
    await newWeekly.save();

    res.status(200).json({
      success: true,
      message: "Weekly has been created succesfully.",
      weekly: newWeekly,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred creating weekly.",
      error: err.message,
    });
  }
};

// get all published weeklies from admin db
export const getAllWeeklies = async (req, res) => {
  const weeklies = await Weekly.find();
  res.status(200).json({
    success: true,
    message: "Weeklies found succesfully.",
    weekliesList: weeklies,
  });
};

export const getWeekly = async (req, res) => {
  const { id } = req.params;

  try {
    const weekly = await Weekly.findById({ id: id });
    res.status(200).json({
      success: true,
      message: "Weekly found succesfully.",
      weekly: weekly,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Not found weekly.",
      error: err.message,
    });
  }
};
