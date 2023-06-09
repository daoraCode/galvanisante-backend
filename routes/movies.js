import { Router } from "express";
import { createMovie, getAllMovies } from "../controllers/movieContollers.js";

// route
const movieRouter = Router();

// routes implemented for admin
// allows to create a new movie,
// @POST
movieRouter.post("/create-movie", createMovie);

// @GET
movieRouter.get("/feed-movie", getAllMovies);
movieRouter.get("/movie/:id", getMovie);

export default movieRouter;
