import { Schema, model } from "mongoose";

const memorySchema = Schema(
  {
    theme: { type: String },
    cover: { type: String },
    content: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
)

const Memory = model("Memory", memorySchema);
export default Memory;
