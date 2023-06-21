import Memory from "../models/Memory.js";
import User from "../models/User.js";

export const createMemory = async (req, res) => {
  const { id } = req.params;
  const { theme, presentation, content } = req.body;

  try {
    const existingMemory = await Memory.findOne({
      theme: theme,
    });

    if (existingMemory) {
      return res.status(403).json({
        success: false,
        message: "Memory already exists.",
        oldMemory: existingMemory.theme,
      });
    }

    const newMemory = new Memory();

    // req.body = user's form input content filled !!
    newMemory.theme = req.body.theme;
    newMemory.presentation = req.body.presentation;
    newMemory.content = req.body.content;
    newMemory.creator = req.user.id;

    console.log(newMemory);
    await newMemory.save();

    res.status(201).json({
      success: true,
      message: "Created Memory.",
      createdMemory: newMemory,
      creator: newMemory.creator,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred. Memory not created.",
      error: err.message,
    });
  }
};

// get all published memories from admin db
export const getAllMemories = async (req, res) => {
  const memories = await Memory.find();
  res.status(200).json({
    success: true,
    message: "Memories found.",
    memoryList: memories,
  });
};

// get a unique Memory by its id
export const getMemory = async (req, res) => {
  const { _id } = req.params;

  try {
    const memory = await Memory.findById({ _id: _id });
    res.status(200).json({
      success: true,
      message: "Memory found.",
      memory: memory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error. Not found Memory.",
      error: err.message,
    });
  }
};

export const deleteMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Memory.findOneAndDelete({
      _id: id,
      creator: req.user.id,
    });

    if (result != null) {
      res
        .status(204)
        .send({ success: true, message: "Memory resource deleted" });
    } else {
      return res.status(403).json({
        success: false,
        message: "This not your memory",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured",
      error: err.message,
    });
  }
};

export const updateMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMemory = await Memory.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    console.log(updatedMemory);
    res.status(204).json({
      success: true,
      message: "Memory resource updated.",
      updateMemory: updatedMemory,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
