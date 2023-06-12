import { Router } from "express";
import {
  getMovie,
  getAllMovies,
  createMovie,
  deleteMovie,
} from "../controllers/movie.contollers.js";

// router
const movieRouter = Router();

// middlewares
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// routes implemented for admin
// allows to create a new movie,
// @POST
movieRouter.post("/create-movie", isAuth, isAdmin, createMovie);

// @GET
movieRouter.get("/movie", getAllMovies);
movieRouter.get("/movie/:id", getMovie);

// DELETE
// @DELETE
// performs the deletion of a movie from database
movieRouter.delete("/movie/:id", isAuth, isAdmin, deleteMovie);

export default movieRouter;
