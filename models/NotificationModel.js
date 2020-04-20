// import mongoose, { model, Schema } from "mongoose";

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  actionDate: {
    type: Date,
    default: Date.now()
  },
  actionUserName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  as: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("notification", NotificationSchema);
