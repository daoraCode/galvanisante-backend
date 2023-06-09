import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovie,
} from "../controllers/movieContollers.js";

// router
const movieRouter = Router();

// routes implemented for admin
// allows to create a new movie,
// @POST
movieRouter.post("/create-movie", createMovie);

// @GET
movieRouter.get("/movie", getAllMovies);
movieRouter.get("/movie/:id", getMovie);

export default movieRouter;
