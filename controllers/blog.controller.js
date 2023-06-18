import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createBlog = async (req, res) => {
  const { id } = req.params;
  const { theme, presentation, content } = req.body;

  if (!theme || !presentation || !content)
    return res
      .status(401)
      .json({ error: "Missing datas. All fields are mandatory." });

  const existingBlog = await Blog.findOne({
    theme: req.body.theme,
  });

  if (existingBlog) {
    return res.status(403).json({
      success: false,
      message: "Blog already exists.",
      oldBlog: existingBlog.theme,
    });
  }
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Created blog.",
      createdBlog: newBlog,
      editor: newBlog.editor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred. Blog not created.",
      error: err.message,
    });
  }
};

// get all published Blogs from admin db
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({
    success: true,
    message: "Blogs found.",
    BlogsList: Blogs,
  });
};

// get a unique Blog by its id
export const getBlog = async (req, res) => {
  const { _id } = req.params;

  try {
    const blog = await Blog.findById({ _id: _id });
    res.status(200).json({
      success: true,
      message: "Blog found.",
      blog: log,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error. Not found blog.",
      error: err.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await blog.findOneAndDelete({ _id: id });
    res.status(204).send({ success: true, message: "Blog resource deleted." });
  } catch (err) {
    res.status(410).json({
      success: false,
      message: "Blog resource already deleted.",
      error: err.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(204).json({
      success: true,
      message: "Blog resource updated.",
      updateBlog: updatedBlog,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
