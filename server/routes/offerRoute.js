import { Router } from "express";
import { protect, restrict } from "../middlewares/auth.js";
import {
  addOffer,
  allOffers,
  deleteOffer,
  editOffer,
} from "../controllers/offerController.js";

const router = Router();

router
  .route("/all-offers")
  .get(protect, restrict("admin", "operator"), allOffers);

router
  .route("/add-offer")
  .post(protect, restrict("admin", "operator"), addOffer);

router
  .route("/edit-offer/:offerID")
  .patch(protect, restrict("admin", "operator"), editOffer);

router
  .route("/delete-offer/:offerID")
  .delete(protect, restrict("admin", "operator"), deleteOffer);

export default router;
