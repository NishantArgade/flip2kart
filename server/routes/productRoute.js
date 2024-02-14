import { Router } from "express";
import {
  addProduct,
  editProduct,
  deleteProduct,
  allProducts,
} from "../controllers/productController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router
  .route("/add-product")
  .post(protect, restrict("admin", "operator"), addProduct);

router
  .route("/edit-product/:productID")
  .patch(protect, restrict("admin", "operator"), editProduct);

router
  .route("/delete-product/:productID")
  .delete(protect, restrict("admin", "operator"), deleteProduct);

router.route("/all-products").get(allProducts);

export default router;
