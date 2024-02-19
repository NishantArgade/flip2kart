import { Router } from "express";
import { protect, restrict } from "../middlewares/auth.js";
import {
  addCategory,
  allCategories,
  deleteCategory,
  editCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.route("/all-categories").get(allCategories);

router
  .route("/add-category")
  .post(protect, restrict("admin", "operator"), addCategory);

router
  .route("/edit-category/:categoryID")
  .patch(protect, restrict("admin", "operator"), editCategory);

router
  .route("/delete-category/:categoryID")
  .delete(protect, restrict("admin", "operator"), deleteCategory);

export default router;
