import { Router } from "express";
import {
  createWeekly,
  getAllWeeklies,
  getWeekly,
} from "../controllers/weeklyController.js";

// routes implemented for admin
// router
const weeklyRouter = Router();

// @POST
// allows admin to create a weekly
weeklyRouter.post("/create-weekly", createWeekly);

// @GET
// allows admin to find weekly by its specific _id or all of them
weeklyRouter.get("/weekly", getAllWeeklies);
weeklyRouter.get("/weekly/:id", getWeekly);


export default weeklyRouter;
