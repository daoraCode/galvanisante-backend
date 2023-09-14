import Memory from "../models/Memory.js";
import User from "../models/User.js";

// get all memories
export const getAllMemories = async (req, res) => {
  const memories = await Memory.find()
  // memories.populate()
  res.status(200).json({
    success: true,
    message: "Found memories",
    memoriesList: memories,
  })
}

// get a unique memory from id
export const getMemory = async (req, res) => {
  const { id } = req.params
  const memory = await Memory.findById(id)
  if (memory) {
    res.status(200).json({
      success: true,
      message: "Found memory",
      memory: memory,
    })
  } else {
    res.status(400).send("Not Found")
  }
}

export const updateMemory = async (req, res) => {
  const { id } = req.params
  try {
    const updatedMemory = await Memory.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      { new: true }
    )
    console.log(updatedMemory)
    res.status(200).json({
      success: true,
      message: "Resource updated succesfull",
      updateMemory: updatedMemory,
    })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

export const deleteMemory = async (req, res) => {
  const { id } = req.params
  try {
    const result = await Memory.findOneAndDelete({
      _id: id,
      creator: req.user.id,
    })
    res.status(204).send({ success: true, message: "Memory resource deleted" })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured",
      error: err.message,
    })
  }
}
