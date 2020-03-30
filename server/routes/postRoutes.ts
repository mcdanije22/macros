import express, { Router, Response, Request } from "express";
import mongoose, { Schema, model } from "mongoose";
import FoodPostModel from "../models/FoodPostModel";
import UserModel from "../models/UserModel";
import CommentModel from "../models/PostCommentModel";
import NotificationModel from "../models/NotificationModel";

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

router.get("/userfeed/:userid", async (req: Request, res: Response) => {
  const { userid } = req.params;
  try {
    const user: any = await UserModel.findById(userid);
    const userFeed = await FoodPostModel.find({
      $or: [{ "user._id": user.following }, { "user._id": user._id }]
    });
    res.send(userFeed);
    console.log(userFeed);
  } catch (error) {
    console.log(error);
  }
});

router.get("/random", async (req: Request, res: Response) => {
  try {
    const randomPost = await FoodPostModel.aggregate([
      { $sample: { size: 1 } }
    ]);
    console.log(randomPost);
    res.send(randomPost);
  } catch (error) {
    console.log(error);
  }
});

//search post generic
router.get("/search/:search", async (req: Request, res: Response) => {
  const { search } = req.params;
  console.log(search);
  const result = await FoodPostModel.find({
    title: { $regex: `${search}`, $options: "-i" }
  });
  res.send(result);
  console.log(result);
});
//search for post by tag
router.get("/search/tags/:tag", async (req: Request, res: Response) => {
  const { tag } = req.params;
  const result = await FoodPostModel.find({
    tags: { $regex: `${tag}`, $options: "-i" }
  });
  res.send(result);
  console.log(result);
});

//search for post by menu option
router.get("/search/category/:search", async (req: Request, res: Response) => {
  const { search } = req.params;
  switch (search) {
    case "calories":
      const caloriesResult = await FoodPostModel.find({
        "macros.calories": {
          $lt: 500
        }
      });
      res.send(caloriesResult);
      break;
    case "protein":
      const proteinResult = await FoodPostModel.find({
        "macros.protein": {
          $gt: 30
        }
      });
      res.send(proteinResult);
      break;
    case "carbohydrate":
      const carbResult = await FoodPostModel.find({
        "macros.carbohydrates": {
          $lt: 20
        }
      });
      res.send(carbResult);
      break;
    case "fat":
      const fatResult = await FoodPostModel.find({
        "macros.fat": {
          $lt: 5
        }
      });
      res.send(fatResult);
      break;
    default:
      break;
  }
});

//return specific food post by id
router.get("/:foodpostid", async (req: Request, res: Response) => {
  const { foodpostid } = req.params;
  try {
    const currentFoodPost = await FoodPostModel.findById(foodpostid);
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
    newFoodPost.user = {
      _id: user._id,
      userName: user.userName,
      following: user.following
    };
    console.log(newFoodPost);
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
        const newNotification: any = new NotificationModel({
          actionDate: new Date(),
          actionUserName: user.userName,
          message: `${user.userName} commented on your ${currentPost.title} post`,
          href: `/foodpost/[id]`,
          as: `/foodpost/${currentPost._id}`
        });
        postUser.notifications.push(newNotification);
        await postUser.save();
      }
      res.send(currentPost);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
