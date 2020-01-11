import express, { Application, Router, Response, Request } from "express";
import User from "../modals/UserModal";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
    console.log(allUsers);
  } catch (error) {
    console.log(error);
  }
});

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
