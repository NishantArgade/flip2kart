import { Router } from "express";
import { protect, restrict } from "../middlewares/auth.js";
import {
  addReview,
  allReviews,
  deleteReview,
  editReview,
} from "../controllers/reviewController.js";

const router = Router();

router.route("/all-reviews").get(protect, allReviews);

router.route("/add-review").post(protect, addReview);

router.route("/edit-review/:reviewID").patch(protect, editReview);

router
  .route("/delete-review/:reviewID")
  .delete(protect, restrict("admin", "operator"), deleteReview);

export default router;
