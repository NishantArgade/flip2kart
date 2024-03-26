import expressAsyncHandler from "express-async-handler";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// export const myOrders = expressAsyncHandler(async (req, res, next) => {
//   const userID = req.user._id;
//   const orders = await Order.find({ billing_user_id: userID });

//   res.status(200).json({
//     status: "success",
//     message: "Fetched my all orders successfully",
//     orders: orders || [],
//   });
// });

export const orderDetail = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.query.order;
  const productID = req.query.product;

  const order = await Order.findById(orderID);
  const product = order.products.find((p) => p.product_id.equals(productID));

  res.status(200).json({
    status: "success",
    message: "Fetch order detail successfully",
    order,
    product,
  });
});

export const changeStatusOfDelivery = expressAsyncHandler(
  async (req, res, next) => {
    const { orderId, productId, status } = req.body;

    const order = await Order.findById(orderId);
    const product = order.products.find((p) => p.product_id.equals(productId));
    product.order_status_history.push({
      status: status,
      date: new Date(),
    });
    product.latest_order_status = {
      status: status,
      date: new Date(),
    };

    // reconver stock if order is cancelled or returned
    if (status === "Cancelled" || status === "Returned") {
      await Product.findByIdAndUpdate(product.product_id, {
        $inc: { stock: product.quantity },
      });
    }

    await order.save();

    res.status(200).json({
      status: "success",
      message: "Update order status successfully",
    });
  }
);

export const createOrder = expressAsyncHandler(async (req, res, next) => {
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
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    cartData,
  } = req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature)
    return res.status(400).json({ message: "Transaction is not legit!" });

  const bulkOps = cartData?.cart.map((item) => ({
    updateOne: {
      filter: { _id: item.product._id },
      update: { $inc: { stock: -item.quantity } },
    },
  }));

  await Product.bulkWrite(bulkOps);

  res.status(200).json({
    message: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

export const getPaymentDataByPaymentID = expressAsyncHandler(
  async (req, res, next) => {
    const paymentId = req.params.paymentId;
    const data = await instance.payments.fetch(paymentId);

    console.log(data);

    res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      data,
    });
  }
);

export const editOrder = expressAsyncHandler(async (req, res, next) => {
  const orderID = req.params.orderID;
  const body = req.body;

  await Order.findByIdAndUpdate(orderID, body);

  res.status(200).json({
    status: "success",
    message: "Order updated successfully",
  });
});

export const cancelOrder = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);

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

// export const filterOrders = expressAsyncHandler(async (req, res, next) => {
//   let { order_status, order_time } = req.query;

//   let filteredOrders = [];
//   filteredOrders = await Order.find().sort({ created_at: -1 }).limit(10);

//   // if (!order_status && !order_time)

//   if (order_status) {
//     order_status = order_status.split(",");
//     filteredOrders = await Order.aggregate([
//       {
//         $addFields: {
//           originalDoc: "$$ROOT",
//         },
//       },
//       { $unwind: "$products" },
//       {
//         $match: {
//           "products.latest_order_status.status": { $in: order_status },
//         },
//       },
//       {
//         $group: {
//           _id: "$originalDoc._id",
//           products: { $push: "$products" },
//           originalDoc: { $first: "$originalDoc" },
//         },
//       },
//       {
//         $replaceRoot: {
//           newRoot: {
//             $mergeObjects: ["$originalDoc", { products: "$products" }],
//           },
//         },
//       },
//     ]).sort({ created_at: -1 });
//   }

//   if (order_time) {
//     const years = order_time.split(",");
//     const dateRanges = years.map((year) => {
//       let startDate, endDate;

//       if (year === "last 30 days") {
//         endDate = new Date();
//         startDate = new Date();
//         startDate.setDate(endDate.getDate() - 30); // 30 days ago
//       } else if (year === "older") {
//         let date = new Date();
//         let currentYear = date.getFullYear();
//         startDate = new Date(0); // the earliest possible date
//         endDate = new Date(currentYear - 4, 11, 31, 23, 59, 59);
//       } else {
//         startDate = new Date(Number(year), 0, 1); // start of the year
//         endDate = new Date(Number(year), 11, 31, 23, 59, 59); // end of the year
//       }

//       return {
//         created_at: {
//           $gte: startDate,
//           $lte: endDate,
//         },
//       };
//     });

//     filteredOrders = await Order.find({ $or: dateRanges }).sort({
//       created_at: -1,
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     message: "Fetched all Orders successfully",
//     filteredOrders,
//   });
// });

export const filterOrders = expressAsyncHandler(async (req, res, next) => {
  let { order_status, order_time, search } = req.query;

  let conditions = [];
  let filteredOrders = [];
  let showEmptyPage = false;

  if (search) {
    conditions.push({
      $or: [
        { "products.name": { $regex: search, $options: "i" } },
        { "products.description": { $regex: search, $options: "i" } },
      ],
    });
  }

  if (order_status) {
    order_status = order_status.split(",");
    conditions.push({
      "products.latest_order_status.status": { $in: order_status },
    });
  }

  if (order_time) {
    const years = order_time.split(",");
    const dateRanges = years.map((year) => {
      let startDate, endDate;

      if (year === "last 30 days") {
        endDate = new Date();
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 30); // 30 days ago
      } else if (year === "older") {
        let date = new Date();
        let currentYear = date.getFullYear();
        startDate = new Date(0); // the earliest possible date
        endDate = new Date(currentYear - 4, 11, 31, 23, 59, 59);
      } else {
        startDate = new Date(Number(year), 0, 1); // start of the year
        endDate = new Date(Number(year), 11, 31, 23, 59, 59); // end of the year
      }

      return {
        created_at: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    });

    conditions.push({ $or: dateRanges });
  }

  if (!order_status && !order_time && !search) {
    filteredOrders = await Order.find({ "payment.status": "captured" }).sort({
      created_at: -1,
    });
    if (filteredOrders.length === 0) showEmptyPage = true;
  } else {
    filteredOrders = await Order.aggregate([
      {
        $addFields: {
          originalDoc: "$$ROOT",
        },
      },
      { $unwind: "$products" },
      {
        $match: {
          $and: conditions,
        },
      },
      {
        $group: {
          _id: "$originalDoc._id",
          products: { $push: "$products" },
          originalDoc: { $first: "$originalDoc" },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$originalDoc", { products: "$products" }],
          },
        },
      },
    ]).sort({ created_at: -1 });
  }

  res.status(200).json({
    status: "success",
    message: "Fetched all Orders successfully",
    filteredOrders,
    showEmptyPage,
  });
});
