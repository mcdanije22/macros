// import express, { Application, Router, Request, Response } from "express";
// import UserModel from "../models/UserModel";
// import FoodPostModel from "../models/FoodPostModel";
// import NotificationModel from "../models/NotificationModel";

// const router: Router = Router();

const express = require("express");
const UserModel = require("../models/UserModel");
const FoodPostModel = require("../models/FoodPostModel");
const NotificationModel = require("../models/NotificationModel");

const router = express.Router();

//get all users in collection
router.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

//get specific user
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  const user = await UserModel.findById(userid, {
    userName: 1,
    fullName: 1,
    posts: 1,
    saves: 1,
    followingCount: 1,
    followerCount: 1
  })
    .populate("posts")
    .populate("saves")
    .populate("following");
  res.send(user);
});

//add user to collection
router.post("/register", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      try {
        const newUser = new UserModel(req.body);
        const result = newUser.save();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }).then(user => {
    if (!user || user.password !== password) {
      return res.status(400).json("Incorrect email or password");
    } else {
      res.send(user);
    }
  });
});

router.post("/like", async (req, res) => {
  const { postId, userId, postUserId } = req.body;
  const user = await UserModel.findOne({ _id: userId });
  const post = await FoodPostModel.findOne({ _id: postId });
  const postUser = await UserModel.findOne({ _id: postUserId });
  if (user.saves.includes(post._id)) {
    return res.status(400).json("Already saved");
  } else {
    await user.saves.push(post._id);
    await user.save();
    post.saves++;
    await post.save();

    if (userId != postUserId) {
      const newNotification = new NotificationModel({
        actionDate: new Date(),
        actionUserName: user.userName,
        message: `${user.userName} liked your ${post.title} post`,
        href: `/foodpost/[id]`,
        as: `/foodpost/${post._id}`
      });
      postUser.notifications.push(newNotification);
    }
    await postUser.save();
    res.send("Post saved");
  }
});

router.post("/follow", async (req, res) => {
  const { loggedUser, userId } = req.body;
  const LoggedInUser = await UserModel.findOne({ _id: loggedUser });
  const followedUser = await UserModel.findOne({ _id: userId });
  if (LoggedInUser.following.includes(userId)) {
    return res.status(400).json("Already following");
  } else {
    await LoggedInUser.following.push(followedUser._id);
    LoggedInUser.followingCount++;
    await LoggedInUser.save();
    await followedUser.followers.push(LoggedInUser._id);
    followedUser.followerCount++;
    const newNotification = new NotificationModel({
      actionDate: new Date(),
      actionUserName: LoggedInUser.userName,
      message: `${LoggedInUser.userName} followed you`,
      href: `/user/[id]`,
      as: `/user/${LoggedInUser._id}`
    });
    followedUser.notifications.push(newNotification);
    await followedUser.save();
    return res.status(200).json("Followed user");
  }
});

router.post("/unfollow", async (req, res) => {
  const { loggedUser, userId } = req.body;
  const LoggedInUser = await UserModel.findOne({ _id: loggedUser });
  const followedUser = await UserModel.findOne({ _id: userId });
  if (!LoggedInUser.following.includes(userId)) {
    return res.status(400).json("Not following user!");
  } else {
    await UserModel.updateOne(
      { _id: LoggedInUser._id },
      { $pull: { following: followedUser._id } }
    );
    LoggedInUser.followingCount--;
    LoggedInUser.save();
    await UserModel.updateOne(
      { _id: followedUser._id },
      { $pull: { followers: LoggedInUser._id } }
    );
    followedUser.followerCount--;
    followedUser.save();
    return res.status(200).json("Stopped following user!");
  }
});

router.post("/deletenotification", async (req, res) => {
  // const { userId, notificationId } = req.body;
  const { newNotificationsList, userId } = req.body;
  const user = await UserModel.findOne({ _id: userId });
  // const notification = await UserModel.findOne({
  //   _id: notificationId
  // });
  try {
    await UserModel.updateOne(
      { _id: user._id },
      // { $pull: { notifications: notificationId } }
      // { $pull: { notifications: { _id: notificationId } } }
      { $set: { notifications: newNotificationsList } }
    );
    await user.save();
    return res.status(200).json("Notification deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
