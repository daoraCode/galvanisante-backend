import { Router } from "express";

import {
  // createWeekly,
  getAllWeeklies,
  getWeekly,
  deleteWeekly,
} from "../controllers/weekly.controller.js";

import Weekly from "../models/Weekly.js";
// import { isAuthenticated } from "../middlewares/auth.js";

// routes implemented for admin
// router
const weeklyRouter = Router();

// @POST
// CREATE
// allows admin to create a weekly
weeklyRouter.post("/create-weekly", async (req, res) => {
  try {
    const newWeekly = await Weekly.create({
      ...req.body,
    });
    res.json(newWeekly);
    // await newWeekly.save();
    // res.status(200).json({
    //   success: true,
    //   message: "Weekly has been created succesfully.",
    //   weekly: newWeekly,
    //   // editor:
    // });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred creating weekly.",
      error: err.message,
    });
  }
});

// @GET
// allows admin to find weekly by its specific _id or all of them
weeklyRouter.get("/weekly", getAllWeeklies);
weeklyRouter.get("/weekly/:_id", getWeekly);

// @DELETE
// performs the deletion of a weekly from database
weeklyRouter.delete("/weekly/:id", deleteWeekly);

export default weeklyRouter;
