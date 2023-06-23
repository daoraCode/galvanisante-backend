import { Schema, model } from "mongoose";

const memorySchema = Schema(
  {
    theme: {
      type: String,
      required: true,
    },
    cover: { type: String },
    content: {
      type: String,
      required: true,
    },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
)

const Memory = model("Memory", memorySchema);
export default Memory;
