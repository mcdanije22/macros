// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import mongoose from "mongoose";
// import path from "path";

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const dburl =
  process.env.MONGODB_URI ||
  'mongodb+srv://josh:josh123@macrosocial-yeplw.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dburl, { useNewUrlParser: true }, () => {
  console.log('db connected')
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

// import postsRoutes from "./routes/postRoutes";
// import userRoutes from "./routes/userRoutes";
// import searchPostsRoutes from "./routes/searchPostsRoutes";

const postsRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
const searchPostsRoutes = require('./routes/searchPostsRoutes')

app.use('/foodposts', postsRoutes)
app.use('/users', userRoutes)
app.use('/searchposts', searchPostsRoutes)

// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

app.listen(PORT, () => console.log(`server started successfully on ${PORT}`))
