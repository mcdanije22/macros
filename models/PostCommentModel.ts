// import mongoose, { model, Schema } from "mongoose";

const mongoose = require("mongoose");

const CommentSchema: any = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("comment", CommentSchema);
