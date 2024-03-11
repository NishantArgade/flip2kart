import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  addAddress,
  editAddress,
  deleteAddress,
  setActiveAddress,
  allMyAddress,
  editActiveAddress,
} from "../controllers/addressController.js";

const router = Router();

router.route("/add-address").post(protect, addAddress);

router.route("/edit-address/:addressID").patch(protect, editAddress);

router
  .route("/edit-active-address/:addressID")
  .patch(protect, editActiveAddress);

router.route("/delete-address/:addressID").delete(protect, deleteAddress);

router.route("/my-addresses").get(protect, allMyAddress);

router.route("/set-active-address/:addressID").post(protect, setActiveAddress);

export default router;
