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
    content: {
      type: String,
      required: true,
    },
    editor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// after every deleted weeklies the admin user will be updated
// by removing weekly's id from its array : weeklies[]
weeklySchema.post("findOneAndDelete", async function (weekly) {
  await model("User").findByIdAndUpdate(
    { _id: weekly.editor },
    { $pull: { weeklies: weekly._id } }
  );
});

// each weelkly that will be created/published by an admin
// user will also be updated though inserting the weekly's id into a list of the admin
weeklySchema.post("save", async function (weekly) {
  await model("User").findByIdAndUpdate(
    { _id: weekly.editor },
    { $push: { weeklies: weekly._id } }
  );
});

const Weekly = model("Weekly", weeklySchema);
export default Weekly;
