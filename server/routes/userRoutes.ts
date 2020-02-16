import express, { Application, Router, Response, Request } from "express";
import UserModel from "../models/UserModel";
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
router.post("/add", (req: Request, res: Response) => {
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
  // const { email, password } = req.body;
  // const test = async () => {
  //   const user: any = await UserModel.findOne({ email });
  //   if (!user) {
  //     return res.status(400).json("Incorrect email or password");
  //   } else if (user.password === password) {
  //     res.send(user);
  //   } else {
  //     return res.status(400).json("Incorrect email or password");
  //   }
  // };
  // test();

  const { email, password } = req.body;

  const user: any = UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json("Incorrect email or password");
  } else if (user.password === password) {
    res.send(user);
  } else {
    return res.status(400).json("Incorrect email or password");
  }
});

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     UserModel.findOne(
//       {
//         email: username
//       },
//       (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false);
//         }
//         if (user.password != password) {
//           return done(null, false);
//         }
//         return done(null, user);
//       }
//     );
//   })
// );

export default router;
