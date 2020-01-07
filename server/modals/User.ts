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
    type: [{ type: Schema.Types.ObjectId, ref: "foodPost" }],
    default: []
  },
  likes: {
    type: Array,
    default: []
  },
  photo: {
    type: String,
    default: "https://via.placeholder.com/400"
  }
});
export default model("user", UserSchema);
