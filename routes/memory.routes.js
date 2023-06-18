import { Router } from "express";

import {
  getAllMemories,
  getMemory,
  createMemory,
  deleteMemory,
  updateMemory,
} from "../controllers/memory.controller.js";

import Memory from "../models/Memory.js";

// middlewares
import { isUserAuthenticated } from "../middlewares/isUser.js";
import { isAuth } from "../middlewares/isAuth.js";
// import { isAdmin } from "../middlewares/isAdmin.js";

const MemoryRouter = Router();

// @POST
MemoryRouter.post("/memory/create", isAuth, createMemory);

// @GET
MemoryRouter.get("/memory", isUserAuthenticated, getAllMemories);
MemoryRouter.get("/memory/:_id", isUserAuthenticated, getMemory);

// @DELETE
MemoryRouter.delete("/memory/:id", isAuth, deleteMemory);

// @PUT
MemoryRouter.post("/memory/update/:id", isAuth, updateMemory);

export default MemoryRouter;
