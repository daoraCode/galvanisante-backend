import { Router } from "express";

import {
  getAllWeeklies,
  getWeekly,
  deleteWeekly,
  createWeekly,
} from "../controllers/weekly.controller.js";

import Weekly from "../models/Weekly.js";

// middlewares
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// routes implemented for admin
// router
const weeklyRouter = Router();

// CREATE
// @POST
// allows admin to create a weekly

weeklyRouter.post(
  "/weekly/create-weekly",
  isAuth,
  isAdmin,
  createWeekly
);

// @GET
// allows admin to find weekly by its specific _id or all of them
weeklyRouter.get("/weekly", getAllWeeklies);
weeklyRouter.get("/weekly/:_id", getWeekly);

// DELETE
// @DELETE
// performs the deletion of a weekly from database
weeklyRouter.delete("/weekly/:id", isAuth, isAdmin, deleteWeekly);

// UPDATE
// @PUT
// weeklyRouter.put("/weekly/:id", updateWeekly);

export default weeklyRouter;
