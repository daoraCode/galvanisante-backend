import { Schema, model } from "mongoose";

const memorySchema = Schema(
  {
    theme: {
      type: String,
      required: true,
      // unique: true
    },
    presentation: {
      type: String,
      default: "",
      // required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Memory = model("Memory", memorySchema);
export default Memory;
