import Weekly from "../models/Weekly.js";
import User from "../models/User.js";

export const createWeekly = async (req, res) => {
  const { id } = req.params;
  const { theme, presentation, content } = req.body;

  if (!theme || !presentation || !content)
    return res
      .status(401)
      .json({ error: "Missing datas. All fields are mandatory." });

  const existingWeekly = await Weekly.findOne({
    theme: req.body.theme,
  });

  if (existingWeekly) {
    return res.status(403).json({
      success: false,
      message: "Weekly already exists.",
      oldWeekly: existingWeekly.theme,
    });
  }
  try {
    // const newWeekly = await Weekly.create({
    // ...req.body,
    // });

    const newWeekly = new Weekly(req.body);
    await newWeekly.save();

    res.status(201).json({
      success: true,
      message: "Created weekly.",
      createdWeekly: newWeekly,
      editor: newWeekly.editor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred. Weekly not created.",
      error: err.message,
    });
  }
};

// get all published weeklies from admin db
export const getAllWeeklies = async (req, res) => {
  const weeklies = await Weekly.find();
  res.status(200).json({
    success: true,
    message: "Weeklies found.",
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
      message: "Weekly found.",
      weekly: weekly,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error. Not found weekly.",
      error: err.message,
    });
  }
};

export const deleteWeekly = async (req, res) => {
  const { id } = req.params;
  try {
    await Weekly.findOneAndDelete({ _id: id });
    res
      .status(204)
      .send({ success: true, message: "Weekly resource deleted." });
  } catch (err) {
    res.status(410).json({
      success: false,
      message: "Weekly resource already deleted.",
      error: err.message,
    });
  }
};

export const updateWeekly = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedWeekly = await Weekly.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(204).json({
      success: true,
      message: "Weekly resource updated.",
      updateWeekly: updatedWeekly,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};