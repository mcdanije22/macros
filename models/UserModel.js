// import mongoose, { model, Schema } from "mongoose";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "foodPost" }]
  },
  saves: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "foodPost" }]
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
  following: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: []
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  notifications: {
    type: Array,
    default: []
  }
});
module.exports = mongoose.model("user", UserSchema);
