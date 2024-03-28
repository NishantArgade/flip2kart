import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  addReview,
  allReviews,
  deleteReview,
  getMyReviewAndRating,
  uploadReviewImages,
  deleteReviewImages,
  getMyAllReviewsRatings,
  getAllReviewsRatings,
  getReviewsByProductId,
} from "../controllers/reviewController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flip2kart-reviews",
    public_id: (req, file) => path.parse(file.originalname).name,
  },
});

const upload = multer({ storage: storage });

router.route("/all-reviews").get(protect, allReviews);

router.route("/my-all-reviews-ratings").get(protect, getMyAllReviewsRatings);

router.route("/all-reviews-ratings").get(protect, getAllReviewsRatings);

router.route("/reviews/:productID").get(protect, getReviewsByProductId);

router.route("/my-review-rating/:productID").get(protect, getMyReviewAndRating);

router.route("/add-review/:productID").post(protect, addReview);

router.route("/delete-review").post(protect, deleteReview);

router
  .route("/upload-review-imgs")
  .post(protect, upload.array("images"), uploadReviewImages);

router.route("/delete-review-imgs").post(protect, deleteReviewImages);

export default router;
