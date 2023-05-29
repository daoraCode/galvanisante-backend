const { Schema, model } = require("mongoose");

const MovieSchema = Schema(
  {
    title: {
      type: String;
    },
    moviePicture: {
      type: String
    },
    released: {
      type: String
    },
  },
  { 
    timestamps: true 
  }
  );
