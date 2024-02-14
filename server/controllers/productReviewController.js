import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/productReviewModel.js";

export const getAllReviews = expressAsyncHandler(async (req, res, next) => {
  const allReviews = await Review.find();

  res.json({
    status: "success",
    message: "Fetched all reviews successfully",
    allReviews,
  });
});

export const getReviewByProductID = expressAsyncHandler(
  async (req, res, next) => {
    const productID = req.params.productID;

    const reviews = await Review.find({ product_id: productID });

    res.json({
      status: "success",
      message: "Fetched all reviews successfully",
      reviews,
    });
  }
);

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;

  await Review.create(body);

  res.json({
    status: "success",
    message: "Review added successfully",
  });
});

export const editReview = expressAsyncHandler(async (req, res, next) => {
  const reviewID = req.params.reviewID;
  const body = req.body;

  await Review.findByIdAndUpdate(reviewID, body);

  res.json({
    status: "success",
    message: "Review updated successfully",
  });
});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {
  const reviewID = req.params.reviewID;

  await Review.findByIdAndDelete(reviewID);

  res.json({
    status: "success",
    message: "Review deleted successfully",
  });
});
