import { Router } from "express";

import {
  getAllBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/Blog.controller.js";

import Blog from "../models/Blog.js";

// middlewares
import { isUserAuthenticated } from "../middlewares/isUser.js";
import { isAuth } from "../middlewares/isAuth.js";
// import { isAdmin } from "../middlewares/isAdmin.js";

const BlogRouter = Router();

// @POST
BlogRouter.post("/blog/create-blog", isAuth, createBlog);

// @GET
BlogRouter.get("/blog", isUserAuthenticated, getAllBlogs);
BlogRouter.get("/blog/:_id", isUserAuthenticated, getBlog);

// @DELETE
BlogRouter.delete("/blog/:id", isAuth, deleteBlog);

// @PUT
BlogRouter.post("/blog-update/:id", isAuth, updateBlog);

export default BlogRouter;
