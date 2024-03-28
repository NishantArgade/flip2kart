import { Router } from "express";
import {
  orderDetail,
  editOrder,
  deleteOrder,
  createOrder,
  allOrders,
  validateOrder,
  saveOrder,
  changeStatusOfDelivery,
  filterOrders,
  getPaymentDataByPaymentID,
} from "../controllers/orderController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router.route("/create-order").post(protect, createOrder);

router.route("/save-order").post(protect, saveOrder);

router.route("/validate-order").post(protect, validateOrder);

router.route("/order-detail").get(protect, orderDetail);

router.route("/change-delivery-status").post(protect, changeStatusOfDelivery);

router
  .route("/edit-order/:orderID")
  .get(protect, restrict("admin", "operator"), editOrder);

router
  .route("/delete-order/:orderID")
  .delete(protect, restrict("admin", "operator"), deleteOrder);

router
  .route("/all-orders")
  .get(protect, restrict("admin", "operator"), allOrders);

router.route("/filter-orders").post(protect, filterOrders);

router
  .route("/payment-data/:paymentId")
  .get(protect, getPaymentDataByPaymentID);

export default router;
