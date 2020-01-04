import mongoose, { Schema, model } from "mongoose";

const FoodPostSchema: Schema = new Schema({
  user: {
    type: String,
    required: true
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
    type: Array
  }
});

export default model("foodPost", FoodPostSchema);