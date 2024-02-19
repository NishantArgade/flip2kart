import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/reviewModel.js";

export const allReviews = expressAsyncHandler(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all reviews successfully",
    reviews,
  });
});

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Review.create(body);

  res.status(200).json({
    status: "success",
    message: "Review added successfully",
  });
});

export const editReview = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.reviewID;
  const body = req.body;
  await Review.findByIdAndUpdate(id, body);

  res.status(200).json({
    status: "success",
    message: "Review updated successfully",
  });
});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.reviewID;

  await Review.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Review deleted successfully",
  });
});
