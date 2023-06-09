import { Schema, model } from "mongoose";

const weeklySchema = Schema(
  {
    mainTitle: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date.now(),
    }
    illustration: {
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
