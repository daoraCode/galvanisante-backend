import { Schema, model } from "mongoose";

const memorySchema = Schema(
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
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

memorySchema.post("findOneAndDelete", async function (memory) {
  await model("User").findByIdAndUpdate(
    { _id: memory.creator },
    { $pull: { memories: memory._id } }
  );
});

memorySchema.post("save", async function (memory) {
  // await
  await model("User").findByIdAndUpdate(
    { _id: memory.creator },
    { $push: { memory: memory._id } }
  );
});

const Memory = model("Memory", memorySchema);
export default Memory;
