import express, { Application, Router, Response, Request } from "express";
import FoodPost from "../modals/FoodPost";
import User from "../modals/user";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allFoodPosts = await FoodPost.find();
    res.send(allFoodPosts);
    console.log(allFoodPosts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:userid/add", async (req: Request, res: Response) => {
  const { userid } = req.params;
  console.log(userid);
  try {
    const newFoodPost: any = new FoodPost(req.body);

    const user: any = await User.findById(userid);
    newFoodPost.user = user;
    await newFoodPost.save();
    user.posts.push(newFoodPost);
    await user.save();
    res.send(newFoodPost);
    console.log(newFoodPost);
  } catch (error) {
    console.log(error);
  }
});

export default router;
