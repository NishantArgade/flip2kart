import { Router } from "express";
import {
  getAllReviews,
  getReviewByProductID,
  addReview,
  editReview,
  deleteReview,
} from "../controllers/productReviewController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router
  .route("/reviews")
  .get(protect, restrict("admin", "operator"), getAllReviews);

router.route("/review/:productID").post(getReviewByProductID);

router.route("/add-review").post(protect, addReview);

router
  .route("/edit-review/:reviewID")
  .post(protect, restrict("admin", "operator"), editReview);

router
  .route("/delete-review/:reviewID")
  .delete(protect, restrict("admin", "operator"), deleteReview);

export default router;
