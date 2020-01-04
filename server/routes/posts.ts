import express, { Application, Router, Response, Request } from "express";
import FoodPost from "../modals/FoodPost";

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

router.post("/add", async (req: Request, res: Response) => {
  try {
    const newFoodPost = new FoodPost({
      user: req.body.user,
      title: req.body.title,
      tags: req.body.tags,
      saves: req.body.saves,
      macros: req.body.macros,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      comments: req.body.comments
    });
    const result = await newFoodPost.save();
    res.send(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
