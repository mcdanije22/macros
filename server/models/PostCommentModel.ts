import mongoose, { model, Schema } from "mongoose";

const CommentSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
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

export default model("comment", CommentSchema);
