// import mongoose, { Schema, model } from "mongoose";

const mongoose = require("mongoose");

const FoodPostSchema: any = new mongoose.Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user"
  // },
  user: {
    type: Object,
    required: true
  },
  foodPhoto: {
    type: String,
    default: "https://via.placeholder.com/400"
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: []
  },
  saves: {
    type: Number,
    default: 0
  },
  macros: {
    type: Object,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  directions: {
    type: Array,
    required: true
  },
  comments: {
    type: Array,
    default: []
  },
  summary: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("foodPost", FoodPostSchema);
