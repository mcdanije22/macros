import express, { Router, Response, Request } from "express";
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

//return specific food post by id
router.get("/:foodpostid", async (req: Request, res: Response) => {
  const { foodpostid } = req.params;
  console.log(foodpostid);
  try {
    const currentFoodPost = await FoodPostModel.findById(foodpostid).populate({
      path: "user",
      select: "userName photo"
    });
    res.send(currentFoodPost);
    console.log(currentFoodPost);
  } catch (error) {
    console.log(error);
  }
});

//add food post from specific user using user id
router.post("/:userid/addpost", async (req: Request, res: Response) => {
  const { userid } = req.params;
  console.log(userid);
  try {
    const newFoodPost: any = new FoodPostModel(req.body);
    const user: any = await UserModel.findById(userid);
    newFoodPost.user = user;
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
    const user: any = await UserModel.findById(userid).populate({
      path: "user",
      select: "userName photo"
    });
    try {
      const newComment: any = new CommentModel(req.body);
      const currentPost: any = await FoodPostModel.findById(postid);
      newComment.user = user;
      currentPost.comments.push(newComment);
      await currentPost.save();
      res.send(currentPost);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
