import { Router } from "express";
import {
  myOrders,
  orderDetail,
  editOrder,
  deleteOrder,
  allTransactions,
  createOrder,
} from "../controllers/orderController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router.route("/order-detail/:orderID").get(protect, orderDetail);

router.route("/my-orders").get(protect, myOrders);

router
  .route("/create-order")
  .post(protect, restrict("admin", "operator"), createOrder);

router
  .route("/edit-order/:orderID")
  .get(protect, restrict("admin", "operator"), editOrder);

router
  .route("/delete-order/:orderID")
  .delete(protect, restrict("admin", "operator"), deleteOrder);

router
  .route("/all-transactions")
  .get(protect, restrict("admin", "operator"), allTransactions);

export default router;
