import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://josh:josh123@macrosocial-yeplw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("db connected");
  }
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

import postsRoute from "./routes/posts";
app.use("/foodposts", postsRoute);

app.listen(PORT, () => console.log(`server started successfully on ${PORT}`));