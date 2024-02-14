import expressAsyncHandler from "express-async-handler";
import { Order } from "../models/orderModel.js";

export const myOrders = expressAsyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  const orders = await Order.find({ user_id: userID });

  res.json({
    status: "success",
    message: "Fetched my all orders successfully",
    orders,
  });
});

export const orderDetail = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  const order = await Order.findById(orderID);
  res.json({
    status: "success",
    message: "Fetch order detail successfully",
    order,
  });
});

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Order.create(body);

  res.status(200).json({
    status: "success",
    message: "Order created successfully",
  });
});

export const editOrder = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  const body = req.body;

  await Order.findByIdAndUpdate(orderID, body);

  res.json({
    status: "success",
    message: "Order updated successfully",
  });
});

export const deleteOrder = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  await Order.findByIdAndDelete(orderID);

  res.json({
    status: "success",
    message: "Order deleted successfully",
  });
});

export const allTransactions = expressAsyncHandler(async (req, res, next) => {
  const allOrders = await Order.find();
  res.json({
    status: "success",
    message: "Fetched all Orders successfully",
    allOrders,
  });
});
