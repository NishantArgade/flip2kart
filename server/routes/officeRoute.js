import { Router } from "express";
import { protect, restrict } from "../middlewares/auth.js";
import {
  allOffices,
  addOffice,
  editOffice,
  deleteOffice,
} from "../controllers/officeController.js";

const router = Router();

router.route("/all-offices").get(protect, allOffices);

router
  .route("/add-office")
  .post(protect, restrict("admin", "operator"), addOffice);

router
  .route("/edit-office/:officeID")
  .patch(protect, restrict("admin", "operator"), editOffice);

router
  .route("/delete-office/:officeID")
  .delete(protect, restrict("admin", "operator"), deleteOffice);

export default router;
