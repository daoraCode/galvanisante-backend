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
import { isAdmin } from "../middlewares/isAdmin.js";
import { isSubscriberAuthenticated } from "../middlewares/isUser.js";

// @POST
movieRouter.post("/movie/create-movie", isAuth, isAdmin, createMovie);

// @GET
movieRouter.get("/movie", isSubscriberAuthenticated, getAllMovies);
movieRouter.get("/movie/:_id", isSubscriberAuthenticated, getMovie);

// @DELETE
movieRouter.delete("/movie/:id", isAuth, isAdmin, deleteMovie);

export default movieRouter;
