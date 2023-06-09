import { Router } from "express";
import { createMovie } from "../controllers/movieContollers.js";

// route
const movieRouter = Router();

// routes implemented for admin
// allows to create a new movie,
// @POST
movieRouter.post("/create-movie", createMovie);

export default movieRouter;
