import express, { Application, Router, Response, Request } from "express";
import User from "../models/UserModel";

const router: Router = Router();

//get all users in collection
router.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
    console.log(allUsers);
  } catch (error) {
    console.log(error);
  }
});

//add user to collection
router.post("/add", async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.send(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
