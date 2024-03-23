import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/reviewModel.js";
import { Product } from "../models/productModel.js";
import { calculateAverageRating } from "../utils/helper.js";
import { User } from "../models/userModel.js";
import _ from "lodash";

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
    }).populate("product_id user_id");

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

export const getMyReviewAndRating = expressAsyncHandler(
  async (req, res, next) => {
    const reviewData = await Review.findOne({
      user_id: req.user._id,
      product_id: req.params.productID,
    }).populate({
      path: "product_id",
      select: "name images overall_rating rating_count",
    });

    res.status(200).json({
      status: "success",
      message: "Fetched all reviews successfully",
      reviewData,
    });
  }
);

export const getRatingAndReviewByProductID = expressAsyncHandler(
  async (req, res, next) => {
    const productID = req.params.productID;

    const [ratings, reviews] = await Promise.all([
      Review.find({
        product_id: productID,
        rating: { $ne: 0 },
      }).select("rating"),
      Review.find({
        product_id: productID,
        rating: { $ne: 0 },
        review_description: { $nin: [undefined, null, ""] },
      }).populate("user_id"),
    ]);

    // Review.findOne({
    //   user_id: req.user._id,
    //   product_id: productID,
    // }),
    // User.findById(req.user._id).populate("orders").select("orders").exec(),

    const all_ratings = ratings.map((item) => item.rating);
    const ratingsWithCount = _.countBy(all_ratings);
    const overallRating = calculateAverageRating(all_ratings);
    // let is_bought = false;
    // for (let order of user.orders) {
    //   for (let product of order.products) {
    //     if (product.product_id == productID) {
    //       is_bought = true;
    //       break;
    //     }
    //   }
    //   if (is_bought) break;
    // }

    res.status(200).json({
      status: "success",
      message: "Fetched all reviews successfully",
      data: {
        totalRatingsCount: all_ratings.length,
        ratingsWithCount,
        overallRating,
        reviews,
      },
    });
  }
);

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  const productID = req.params.productID;
  const review = req.body;

  await Review.findOneAndUpdate(
    { user_id: userID, product_id: productID },
    review,
    { new: true, upsert: true }
  );

  const ratings = await Review.find({
    product_id: productID,
    rating: { $ne: 0 },
  }).select("rating");

  const all_ratings = ratings.map((item) => item.rating);
  const overall_rating = calculateAverageRating(all_ratings);

  await Product.findByIdAndUpdate(productID, {
    rating_count: all_ratings.length,
    overall_rating,
  });

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
