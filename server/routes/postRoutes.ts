import express, { Router, Response, Request } from "express";
import mongoose, { Schema, model } from "mongoose";
import FoodPostModel from "../models/FoodPostModel";
import UserModel from "../models/UserModel";
import CommentModel from "../models/PostCommentModel";

const router: Router = Router();

//return all food post in collection
router.get("/", async (req: Request, res: Response) => {
  try {
    const allFoodPosts = await FoodPostModel.find().populate({
      path: "user",
      select: "userName"
    });
    res.send(allFoodPosts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/random", async (req: Request, res: Response) => {
  try {
    const randomPost = await FoodPostModel.aggregate([
      { $sample: { size: 1 } }
    ]);
    res.send(randomPost);
  } catch (error) {
    console.log(error);
  }
});

//return specific food post by id
router.get("/:foodpostid", async (req: Request, res: Response) => {
  const { foodpostid } = req.params;
  try {
    const currentFoodPost = await FoodPostModel.findById(foodpostid).populate({
      path: "user",
      select: "userName photo fullName"
    });
    res.send(currentFoodPost);
  } catch (error) {
    console.log(error);
  }
});

//add food post from specific user using user id
router.post("/:userid/addpost", async (req: Request, res: Response) => {
  const { userid } = req.params;
  try {
    const newFoodPost: any = new FoodPostModel(req.body);
    const user: any = await UserModel.findById(userid);
    newFoodPost.user = user;
    console.log(newFoodPost.user);
    await newFoodPost.save();
    user.posts.push(newFoodPost);
    await user.save();
    res.send(newFoodPost);
  } catch (error) {
    console.log(error);
  }
});

//add new comment to food post
router.post(
  "/:userid/:postid/addcomment",
  async (req: Request, res: Response) => {
    const { userid, postid } = req.params;
    const { postUserId } = req.body;
    const user: any = await UserModel.findById(userid, {
      userName: 1,
      photo: 1
    });
    const postUser: any = await UserModel.findById(postUserId);
    try {
      const newComment: any = new CommentModel(req.body);
      const currentPost: any = await FoodPostModel.findById(postid);
      newComment.user = user;
      currentPost.comments.push(newComment);
      await currentPost.save();
      if (userid != postUserId) {
        await postUser.notifications.push({
          actionDate: new Date(),
          actionUserName: user.userName,
          message: `${user.userName} commented on your ${currentPost.title} post`,
          href: `/foodpost/[id]`,
          as: `/foodpost/${currentPost._id}`
        });
        await postUser.save();
      }
      res.send(currentPost);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
