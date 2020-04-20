// import express, { Router, Request, Response } from "express";
// import mongoose, { Schema, model } from "mongoose";
// import FoodPostModel from "../models/FoodPostModel";

const express = require("express");
const mongoose = require("mongoose");
const FoodPostModel = require("../models/FoodPostModel");

const router = express.Router();

//search post generic
router.get("/:search", async (req, res) => {
  const { search } = req.params;
  console.log(search);
  const result = await FoodPostModel.find({
    title: { $regex: `${search}`, $options: "-i" }
  });
  res.send(result);
  console.log(result);
});
//search for post by tag
router.get("/tags/:tag", async (req, res) => {
  const { tag } = req.params;
  const result = await FoodPostModel.find({
    tags: { $regex: `${tag}`, $options: "-i" }
  });
  res.send(result);
  console.log(result);
});

//search for post by menu option
router.get("/category/:search", async (req, res) => {
  const { search } = req.params;
  switch (search) {
    case "low calories":
      const caloriesResult = await FoodPostModel.find({
        "macros.calories": {
          $lt: 500
        }
      });
      res.send(caloriesResult);
      break;
    case "high protein":
      const proteinResult = await FoodPostModel.find({
        "macros.protein": {
          $gt: 30
        }
      });
      res.send(proteinResult);
      break;
    case "low carbohydrate":
      const carbResult = await FoodPostModel.find({
        "macros.carbohydrates": {
          $lt: 20
        }
      });
      res.send(carbResult);
      break;
    case "low fat":
      const fatResult = await FoodPostModel.find({
        "macros.fat": {
          $lt: 5
        }
      });
      res.send(fatResult);
      break;
    default:
      break;
  }
});

module.exports = router;
