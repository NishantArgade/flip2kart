import asyncHandler from "express-async-handler";
import { Order } from "../models/orderModel.js";
import _ from "lodash";

export const getMonthlySalesData = asyncHandler(async (req, res, next) => {
  const currentYear = new Date().getFullYear();
  const start = new Date(currentYear, 0, 1); // January 1 of the current year
  const end = new Date(currentYear + 1, 0, 1); // January 1 of the next year

  const data = await Order.find({
    "payment.status": "captured",
    created_at: {
      $gte: start,
      $lt: end,
    },
  }).select("products created_at -_id");

  let result = data.map((order) => {
    return order.products.map((product) => {
      return {
        month: order.created_at.getMonth(),
        totalPrice: product.afterDiscountTotalPrice,
        totalQty: product.quantity,
      };
    });
  });

  // Flatten the array of arrays into a single array
  result = _.flatten(result);

  let initialResult = [
    { month: "Jan", totalPrice: 0, totalQty: 0 },
    { month: "Feb", totalPrice: 0, totalQty: 0 },
    { month: "Mar", totalPrice: 0, totalQty: 0 },
    { month: "Apr", totalPrice: 0, totalQty: 0 },
    { month: "May", totalPrice: 0, totalQty: 0 },
    { month: "Jun", totalPrice: 0, totalQty: 0 },
    { month: "Jul", totalPrice: 0, totalQty: 0 },
    { month: "Aug", totalPrice: 0, totalQty: 0 },
    { month: "Sep", totalPrice: 0, totalQty: 0 },
    { month: "Oct", totalPrice: 0, totalQty: 0 },
    { month: "Nov", totalPrice: 0, totalQty: 0 },
    { month: "Dec", totalPrice: 0, totalQty: 0 },
  ];

  result = _(result)
    .groupBy("month")
    .map((items, month) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][month],
      totalPrice: _.sumBy(items, "totalPrice"),
      totalQty: _.sumBy(items, "totalQty"),
    }))
    .value();

  let isEmpty = true;
  let totalRevenue = 0;
  let totalUnitSold = 0;
  // Merge the initialResult with the result
  result.forEach((item) => {
    let index = initialResult.findIndex((i) => i.month === item.month);
    if (index !== -1) {
      isEmpty = false;
      totalRevenue += item.totalPrice;
      totalUnitSold += item.totalQty;
      initialResult[index] = item;
    }
  });

  res.json({ result: initialResult, isEmpty, totalRevenue, totalUnitSold });
});

export const getDailySalesData = asyncHandler(async (req, res, next) => {
  const data = await Order.find({ "payment.status": "captured" }).select(
    "products created_at -_id"
  );

  let result = data.map((order) => {
    return order.products.map((product) => {
      return {
        date: order.created_at.toISOString().split("T")[0],
        totalPrice: product.afterDiscountTotalPrice,
        totalQty: product.quantity,
      };
    });
  });

  // Flatten the array of arrays into a single array
  result = _.flatten(result);

  result = _(result)
    .groupBy("date")
    .map((items, date) => ({
      date: date,
      totalSales: _.sumBy(items, "totalPrice"),
      totalQty: _.sumBy(items, "totalQty"),
    }))
    .value();

  res.json({ result: result });
});

export const getSalesBreakdownData = asyncHandler(async (req, res, next) => {
  const data = await Order.find({ "payment.status": "captured" }).select(
    "products created_at -_id"
  );

  let result = data.flatMap((order) =>
    order.products.map((product) => ({
      category: product.category,
      totalPrice: product.afterDiscountTotalPrice,
      totalQty: product.quantity,
    }))
  );

  let overallTotalSales = 0;

  result = _(result)
    .groupBy("category")
    .map((items, category) => {
      const totalSales = _.sumBy(items, "totalPrice");
      overallTotalSales += totalSales;
      return {
        category: category,
        totalSales: totalSales,
        totalQty: _.sumBy(items, "totalQty"),
      };
    })
    .value();

  res.json({ result: result, overallTotalSales: overallTotalSales });
});
