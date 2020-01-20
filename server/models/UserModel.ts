import mongoose, { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: "foodPost" }]
  },
  saves: {
    type: [{ type: Schema.Types.ObjectId, ref: "foodPost" }]
  },
  photo: {
    type: String,
    default: "https://via.placeholder.com/400"
  },
  followingCount: {
    type: Number,
    default: 0
  },
  followerCount: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now()
  }
});
export default model("user", UserSchema);
