import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";

export const loginUser = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ users });
});

export const regiserUser = asyncHandler(async (req, res, next) => {
  const body = req.body;
  await User.create(body);
  res.status(200).json({ body });
});
