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

// @POST
movieRouter.post("/create-movie", isAuth, isAdmin, createMovie);

// @GET
movieRouter.get("/movie", getAllMovies);
movieRouter.get("/movie/:id", getMovie);

// @DELETE
movieRouter.delete("/movie/:id", isAuth, isAdmin, deleteMovie);

export default movieRouter;
