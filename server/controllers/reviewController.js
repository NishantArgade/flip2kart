import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";
import { calculateAverageRating } from "../utils/helper.js";
import _ from "lodash";
import { Order } from "../models/orderModel.js";

export const allReviews = expressAsyncHandler(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all reviews successfully",
    reviews,
  });
});

export const getMyAllReviewsRatings = expressAsyncHandler(
  async (req, res, next) => {
    const myAllRviewsAndRatings = await Review.find({
      user_id: req.user._id,
    }).populate([
      { path: "product_id", select: "name images" },
      { path: "user_id", select: "first_name last_name" },
    ]);

    res.status(200).json({
      status: "success",
      message: "Fetched all reviews successfully",
      myAllRviewsAndRatings,
    });
  }
);

export const getAllReviewsRatings = expressAsyncHandler(
  async (req, res, next) => {
    const allRviewsAndRatings = await Review.find()
      .populate({
        path: "product_id",
        select: "name",
      })
      .populate({
        path: "user_id",
        select: "first_name last_name email phone",
      });

    res.status(200).json({
      status: "success",
      message: "Fetched all reviews successfully",
      allRviewsAndRatings,
    });
  }
);

export const getReviewsByProductId = expressAsyncHandler(
  async (req, res, next) => {
    const reviews = await Review.find({
      product_id: req.params.productID,
    }).populate("user_id", "first_name last_name");

    res.status(200).json({
      status: "success",
      message: "Fetched all reviews by product id successfully",
      reviews,
    });
  }
);

export const getMyReviewAndRating = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;
    const productId = req.params.productID;

    const order = await Order.findOne({
      billing_user_id: userId,
      products: {
        $elemMatch: {
          product_id: productId,
        },
      },
    });

    const isBoughtProduct = order != null;

    const productData = await Product.findById(productId).select(
      "name images rating_review"
    );

    const myReviewData = await Review.findOne({
      user_id: userId,
      product_id: productId,
    }).populate({
      path: "product_id",
      select: "name images overall_rating rating_count",
    });

    res.status(200).json({
      status: "success",
      message: "Fetched all reviews successfully",
      isBoughtProduct,
      productData,
      myReviewData: myReviewData || {},
    });
  }
);

export async function updateProductReviewRating(productID) {
  const ratings = await Review.find({
    product_id: productID,
    rating: { $ne: 0 },
  }).select("rating");

  const all_ratings = ratings.map((item) => item.rating);
  const ratingsWithCount = _.countBy(all_ratings);
  const overall_rating = calculateAverageRating(all_ratings);

  const review_count = await Review.find({
    product_id: productID,
    rating: { $ne: 0 },
    review_description: { $nin: [undefined, null, ""] },
  }).countDocuments();

  await Product.findByIdAndUpdate(productID, {
    rating_review: {
      overall_rating: overall_rating,
      rating_count: all_ratings.length,
      review_count: review_count,
      classify_ratings: ratingsWithCount,
    },
  });
}

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  const productID = req.params.productID;
  const review = req.body;

  await Review.findOneAndUpdate(
    { user_id: userID, product_id: productID },
    review,
    { new: true, upsert: true }
  );

  await updateProductReviewRating(productID);

  res.status(200).json({
    status: "success",
    message: "Review added successfully",
  });
});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {
  const { reviewId, productId } = req.body;

  await Review.findByIdAndDelete(reviewId);

  await updateProductReviewRating(productId);

  res.status(200).json({
    status: "success",
    message: "Review deleted successfully",
  });
});

export const uploadReviewImages = (req, res) => {
  const uploadedImages = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  res.status(200).json({ uploadedImages });
};

export const deleteReviewImages = expressAsyncHandler(
  async (req, res, next) => {
    const images = req.body.images;

    const deletePromises = images.map((item) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(item?.filename, function (error, result) {
          if (error) reject(error);
          else resolve(result);
        });
      });
    });

    Promise.all(deletePromises)
      .then(() => res.status(200).json({ message: "Images deleted" }))
      .catch((error) => {
        next(new CustomError("An error occurred while deleting images", 500));
      });
  }
);
