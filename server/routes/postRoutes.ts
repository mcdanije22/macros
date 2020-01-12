import express, { Router, Response, Request } from "express";
import FoodPost from "../modals/FoodPostModal";
import User from "../modals/UserModal";

const router: Router = Router();

//return all food post in collection
router.get("/", async (req: Request, res: Response) => {
  try {
    const allFoodPosts = await FoodPost.find().populate({
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
    const currentFoodPost = await FoodPost.findById(foodpostid).populate({
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
  } catch (error) {
    console.log(error);
  }
});

export default router;
