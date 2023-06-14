import { Router } from "express";

import {
  getAllWeeklies,
  getWeekly,
  createWeekly,
  deleteWeekly,
  updateWeekly,
} from "../controllers/weekly.controller.js";

import Weekly from "../models/Weekly.js";

// middlewares
import { isUserAuthenticated } from "../middlewares/isUser.js";

import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const weeklyRouter = Router();

// @POST
weeklyRouter.post("/weekly/create-weekly", isAuth, isAdmin, createWeekly);

// @GET
weeklyRouter.get("/weekly", isUserAuthenticated, getAllWeeklies);
weeklyRouter.get("/weekly/:_id", isUserAuthenticated, getWeekly);

// @DELETE
weeklyRouter.delete("/weekly/:id", isAuth, isAdmin, deleteWeekly);

// @PUT
weeklyRouter.post("/weekly-update/:id", isAuth, isAdmin, updateWeekly);

export default weeklyRouter;
