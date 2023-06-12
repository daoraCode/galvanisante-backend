import Weekly from "../models/Weekly.js";
import User from "../models/User.js";

export const createWeekly = async (req, res) => {
  try {
    const newWeekly = await Weekly.create({
      ...req.body,
    });
    res.json(newWeekly);
    // await newWeekly.save();
    // res.status(200).json({
    //   success: true,
    //   message: "Weekly has been created succesfully.",
    //   weekly: newWeekly,
    //   // editor:
    // });
  } catch (err) {
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

// get a unique weekly by its id
export const getWeekly = async (req, res) => {
  const { _id } = req.params;

  try {
    const weekly = await Weekly.findById({ _id: _id });
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

export const deleteWeekly = async (req, res) => {
  const { id } = req.params;
  await Weekly.findOneAndDelete({ _id: id });
};

// const { id } = req.params;
// const { theme, presentation, content } = req.body;
// const existingWeekly = await Weekly.findOne({
//   theme: req.body.theme,
// });

// if (existingWeekly) {
//   return res.status(403).json({
//     success: false,
//     message: "Weekly already exists.",
//   });
// }

// const editor = await User.findById({ _id: id });
