import expressAsyncHandler from "express-async-handler";
import { Order } from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

export const myOrders = expressAsyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  const orders = await Order.find({ user_id: userID });

  res.status(200).json({
    status: "success",
    message: "Fetched my all orders successfully",
    orders: orders || [],
  });
});

export const orderDetail = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  const order = await Order.findById(orderID);
  res.status(200).json({
    status: "success",
    message: "Fetch order detail successfully",
    order,
  });
});

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = req.body;
  const order = await instance.orders.create(options);

  if (!order) return res.status(500).send("Error");

  res.status(200).json(order);
});

export const saveOrder = expressAsyncHandler(async (req, res, next) => {
  const order = req.body;
  await Order.create(order);

  res.status(200).json({
    status: "success",
    message: "Order saved successfully",
  });
});

export const validateOrder = expressAsyncHandler(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature)
    return res.status(400).json({ message: "Transaction is not legit!" });

  const { method } = await instance.payments.fetch(razorpay_payment_id);

  res.status(200).json({
    message: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    method,
  });
});

export const editOrder = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  const body = req.body;

  await Order.findByIdAndUpdate(orderID, body);

  res.status(200).json({
    status: "success",
    message: "Order updated successfully",
  });
});

export const deleteOrder = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  await Order.findByIdAndDelete(orderID);

  res.status(200).json({
    status: "success",
    message: "Order deleted successfully",
  });
});

export const allOrders = expressAsyncHandler(async (req, res, next) => {
  const allOrders = await Order.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all Orders successfully",
    allOrders,
  });
});
