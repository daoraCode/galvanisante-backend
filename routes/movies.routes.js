import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovie,
} from "../controllers/movie.contollers.js";
import { isAuth } from "../middlewares/isAuth.js";

// router
const movieRouter = Router();

// middlewares
import { isAdmin } from "../middlewares/isAdmin.js";
import { verifyRole } from "../middlewares/isRole.js";

// routes implemented for admin
// allows to create a new movie,
// @POST
movieRouter.post("/create-movie", isAuth, verifyRole, isAdmin, createMovie);

// @GET
movieRouter.get("/movie", getAllMovies);
movieRouter.get("/movie/:id", getMovie);

export default movieRouter;
