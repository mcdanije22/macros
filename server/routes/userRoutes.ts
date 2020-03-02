import express, { Application, Router, Response, Request } from "express";
import UserModel from "../models/UserModel";
import FoodPostModel from "../models/FoodPostModel";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

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
    fullName: 1,
    photo: 1,
    posts: 1,
    saves: 1,
    followingCount: 1,
    followerCount: 1
  })
    .populate("posts")
    .populate("saves");
  res.send(user);
});

//add user to collection
router.post("/register", (req: Request, res: Response) => {
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

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((user: any) => {
    if (!user || user.password !== password) {
      return res.status(400).json("Incorrect email or password");
    } else {
      res.send(user);
    }
  });
});

router.post("/like", async (req: Request, res: Response) => {
  const { postId, userId } = req.body;
  const user: any = await UserModel.findOne({ _id: userId });
  const post: any = await FoodPostModel.findOne({ _id: postId });
  if (user.saves.includes(postId)) {
    return res.status(400).json("Already saved");
  } else {
    user.saves.push(postId);
    user.save();
    post.saves++;
    post.save();
    console.log(user);
  }
});

router.post("/follow", async (req: Request, res: Response) => {
  const { loggedUser, userId } = req.body;
  const LoggedInUser: any = await UserModel.findOne({ _id: loggedUser });
  const followedUser: any = await UserModel.findOne({ _id: userId });
  if (LoggedInUser.following.includes(userId)) {
    return res.status(400).json("Already following");
  } else {
    await LoggedInUser.following.push(userId);
    LoggedInUser.followingCount++;
    await LoggedInUser.save();
    await followedUser.followers.push(loggedUser);
    followedUser.followerCount++;
    await followedUser.notfications.push({
      message: `${LoggedInUser.userName} followed you`,
      link: `http://localhost:3000/users/${LoggedInUser._id}`
    });
    await followedUser.save();
    return res.status(200).json("Followed user");
  }
});

router.post("/unfollow", async (req: Request, res: Response) => {
  const { loggedUser, userId } = req.body;
  const LoggedInUser: any = await UserModel.findOne({ _id: loggedUser });
  const followedUser: any = await UserModel.findOne({ _id: userId });
  if (!LoggedInUser.following.includes(userId)) {
    return res.status(400).json("Not following user!");
  } else {
    await UserModel.updateOne(
      { _id: loggedUser },
      { $pull: { following: userId } }
    );
    LoggedInUser.followingCount--;
    LoggedInUser.save();
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { followers: loggedUser } }
    );
    followedUser.followerCount--;
    followedUser.save();
    return res.status(200).json("Stopped following user!");
  }
});

export default router;
