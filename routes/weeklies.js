import { Router } from "express";
import { createWeekly } from "../controllers/weeklyController.js";

// router
const weeklyRouter = Router();

// routes implemented for admin
// allows to create a new weekly,
// @POST
weeklyRouter.post("/create-weekly", createWeekly);

// @GET
// allows admin to retrieve all weekly built
// weeklyRouter.get("/weekly", createWeekly);

export default weeklyRouter;
