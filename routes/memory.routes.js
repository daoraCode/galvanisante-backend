import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadMiddleware = multer({ dest: "public/" });

import {
  getAllMemories,
  getMemory,
  // createMemory,
  deleteMemory,
  updateMemory,
} from "../controllers/memory.controller.js";

import Memory from "../models/Memory.js";

// middlewares
import { isUserAuthenticated } from "../middlewares/isUser.js";
import { isAuth } from "../middlewares/isAuth.js";
// import { isAdmin } from "../middlewares/isAdmin.js";

const MemoryRouter = express.Router();
const app = express();
app.use("/uploads", express.static(__dirname + "/uploads"));
// @POST
// MemoryRouter.post("/memory/create", isAuth, createMemory);
MemoryRouter.post(
  "/memory/create",
  isAuth,
  uploadMiddleware.single("file"),
  async (req, res) => {
    // renaming files
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

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

      const newMemory = await Memory.create({
        theme,
        presentation: newPath,
        content,
        creator: req.user.id,
      });

      // req.body = user's form input content filled !!
      // newMemory.theme = req.body.theme;
      // newMemory.presentation = req.body.presentation;
      // newMemory.presentation = req.body.file;
      // newMemory.presentation = req.body.newPath;
      // newMemory.presentation = newPath;
      // newMemory.content = req.body.content;
      // newMemory.creator = req.user.id;

      res.status(201).json({
        success: true,
        message: "Created Memory.",
        createdMemory: newMemory,
        creator: newMemory.creator,
      });
      console.log("80", newMemory);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error occurred. Memory not created.",
        error: err.message,
      });
    }
  }
);

// @GET
MemoryRouter.get("/memory", isAuth, getAllMemories);
MemoryRouter.get("/memory/:_id", isUserAuthenticated, getMemory);

// @DELETE
MemoryRouter.delete("/memory/delete/:id", isAuth, deleteMemory);

// @PUT
MemoryRouter.post("/memory/update/:id", isAuth, updateMemory);

export default MemoryRouter;
