import { Router } from "express";
import {
  myOrders,
  orderDetail,
  editOrder,
  deleteOrder,
  createOrder,
  allOrders,
  validateOrder,
  saveOrder,
} from "../controllers/orderController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router.route("/create-order").post(protect, createOrder);

router.route("/save-order").post(protect, saveOrder);

router.route("/validate-order").post(protect, validateOrder);

router.route("/order-detail/:orderID").get(protect, orderDetail);

router.route("/my-orders").get(protect, myOrders);

router
  .route("/edit-order/:orderID")
  .get(protect, restrict("admin", "operator"), editOrder);

router
  .route("/delete-order/:orderID")
  .delete(protect, restrict("admin", "operator"), deleteOrder);

router
  .route("/all-orders")
  .get(protect, restrict("admin", "operator"), allOrders);

export default router;
