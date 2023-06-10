import { Schema, model } from "mongoose";

const weeklySchema = Schema(
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
    description: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Weekly = model("Weekly", weeklySchema);
export default Weekly;
