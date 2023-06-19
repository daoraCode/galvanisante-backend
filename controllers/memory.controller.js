import Memory from "../models/Memory.js";
import User from "../models/User.js";

export const createMemory = async (req, res) => {
  const { id } = req.params;
  const { theme, presentation, content } = req.body;

  if (!theme || !presentation || !content)
    return res
      .status(401)
      .json({ error: "Missing datas. All fields are mandatory." });

  const existingMemory = await Memory.findOne({
    theme: req.body.theme,
  });

  if (existingMemory) {
    return res.status(403).json({
      success: false,
      message: "Memory already exists.",
      oldMemory: existingMemory.theme,
    });
  }
  try {
    const newMemory = new Memory(req.body);
    await newMemory.save();

    res.status(201).json({
      success: true,
      message: "Created Memory.",
      createdMemory: newMemory,
      editor: newMemory.creator,
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
    await Memory.findOneAndDelete({ _id: id });
    res
      .status(204)
      .send({ success: true, message: "Memory resource deleted." });
  } catch (err) {
    res.status(410).json({
      success: false,
      message: "Memory resource already deleted.",
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
    res.status(204).json({
      success: true,
      message: "Memory resource updated.",
      updateMemory: updatedMemory,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};