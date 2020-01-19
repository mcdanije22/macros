import express, { Application, Router, Response, Request } from "express";
import UserModel from "../models/UserModel";

const router: Router = Router();

//get all users in collection
router.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

//get specific user
router.get("/:userid", async (req: Request, res: Response) => {
  const { userid } = req.params;
  const user: any = await UserModel.findById(userid, {
    userName: 1,
    photo: 1,
    posts: 1,
    saves: 1,
    followingCount: 1,
    followersCount: 1
  })
    .populate("posts")
    .populate("saves");
  res.send(user);
});

//add user to collection
router.post("/add", async (req: Request, res: Response) => {
  try {
    const newUser = new UserModel(req.body);
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
