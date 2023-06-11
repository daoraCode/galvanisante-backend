import { Router } from "express";
import {
  createWeekly,
  getAllWeeklies,
  getWeekly,
  deleteWeekly,
} from "../controllers/weeklyController.js";

import { isAdminAuthentified } from "../middlewares/users.js";

// routes implemented for admin
// router
const weeklyRouter = Router();

// @POST
// allows admin to create a weekly
weeklyRouter.post("/create-weekly", isAdminAuthentified, createWeekly);

// @GET
// allows admin to find weekly by its specific _id or all of them
weeklyRouter.get("/weekly", getAllWeeklies);
weeklyRouter.get("/weekly/:_id", getWeekly);

// @DELETE
// performs the deletion of a weekly from database
weeklyRouter.delete("/weekly/:id", deleteWeekly);


export default weeklyRouter;
