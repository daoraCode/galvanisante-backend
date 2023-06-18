import { Router } from "express";
import {
  getMovie,
  getAllMovies,
  createMovie,
  deleteMovie,
} from "../controllers/movie.contollers.js";

const movieRouter = Router();

// middlewares
import { isAuth } from "../middlewares/isAuth.js";
import { isUserAuthenticated } from "../middlewares/isUser.js";

// @POST
movieRouter.post("/movie/create-movie", isAuth, createMovie);

// @GET
movieRouter.get("/movie", isUserAuthenticated, getAllMovies);
movieRouter.get("/movie/:_id", isUserAuthenticated, getMovie);

// @DELETE
movieRouter.delete("/movie/:id", isAuth, deleteMovie);

export default movieRouter;
