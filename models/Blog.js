import { Schema, model } from "mongoose";

const blogSchema = Schema(
  {
    theme: {
      type: String,
      required: true,
    },
    presentation: {
      type: String,
      default: "",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.post("findOneAndDelete", async function (blog) {
  await model("User").findByIdAndUpdate(
    { _id: blog.author },
    { $pull: { weeklies: blog._id } }
  );
});

blogSchema.post("save", async function (blog) {
  // await
  await model("User").findByIdAndUpdate(
    { _id: blog.editor },
    { $push: { blogs: blog._id } }
  );
});

const Blog = model("Blog", blogSchema);
export default Blog;
