import mongoose, { Schema, model } from "mongoose";

const CommentSchema: Schema = new Schema({
  user: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const FoodPostSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
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
    type: [CommentSchema]
  },
  summary: {
    type: String,
    required: true
  }
});

export default model("foodPost", FoodPostSchema);
