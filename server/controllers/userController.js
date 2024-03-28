import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { CustomError } from "../utils/CustomError.js";
import { sendMail } from "../utils/sendMail.js";
import { cookiesOption, generateOTP, generateToken } from "../utils/helper.js";
import jwt from "jsonwebtoken";
import { Order } from "../models/orderModel.js";
import { Address } from "../models/addressModel.js";
import { Product } from "../models/productModel.js";

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(
      new CustomError("You are not registered with us. Please sign up.", 404)
    );

  const otp = generateOTP(6); // Generate a 6-digit OTP
  const otpExpiry = process.env.OTP_EXPIRY;

  const subject = "OTP for Login Verification";

  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 5px;">
  <h1 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Login Verification</h1>
  <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">Dear User,</p>
  <p style="font-size: 16px; line-height: 1.5;">Use OTP <span style="color: blue; font-weight: bold;">${otp}</span> to log in your account.</p>
  <p style="font-size: 16px; line-height: 1.5;">This OTP is valid for ${otpExpiry} minutes from the time it was sent.</p>
  <p style="font-size: 16px; line-height: 1.5;">DO NOT SHARE this code with anyone, including the delivery executive. @www.flip2kart.com #<span style="color: blue; font-weight: bold;">${otp}</span> </p>
  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0;">Best Regards,</p>
  <p style="font-size: 16px; line-height: 1.5; margin-top: 0;">Flip2Kart Team</p>
  </div>`;

  user.otp = otp;
  user.otp_expiry = Date.now() + otpExpiry * 60 * 1000;
  await user.save();

  try {
    await sendMail(process.env.NODEMAILER_EMAIL, email, subject, html, null);

    res.status(200).json({
      status: "success",
      message: "OTP sent to your email!",
      otp,
    });
  } catch (error) {
    //reset otp and otp_expiry
    user.otp = undefined;
    user.otp_expiry = undefined;
    await user.save();

    return next(new CustomError("Email could not be sent!", 500));
  }
});

export const regiserUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const isAlreadyExists = await User.findOne({ email });
  if (isAlreadyExists)
    return next(
      new CustomError("You are already registered. Please log in.", 400)
    );

  const otp = generateOTP(6); // Generate a 6-digit OTP
  const otpExpiry = process.env.OTP_EXPIRY;

  const subject = "OTP for Login Verification";

  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 5px;">
  <h1 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Login Verification</h1>
  <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">Dear User,</p>
  <p style="font-size: 16px; line-height: 1.5;">Use OTP <span style="color: blue; font-weight: bold;">${otp}</span> to log in your account.</p>
  <p style="font-size: 16px; line-height: 1.5;">This OTP is valid for ${otpExpiry} minutes from the time it was sent.</p>
  <p style="font-size: 16px; line-height: 1.5;">DO NOT SHARE this code with anyone, including the delivery executive. @www.flip2kart.com #<span style="color: blue; font-weight: bold;">${otp}</span> </p>
  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0;">Best Regards,</p>
  <p style="font-size: 16px; line-height: 1.5; margin-top: 0;">Flip2Kart Team</p>
  </div>`;

  const user = await User.create({
    email,
    otp,
    otp_expiry: Date.now() + otpExpiry * 60 * 1000,
  });

  try {
    await sendMail(process.env.NODEMAILER_EMAIL, email, subject, html, null);

    res.status(200).json({
      status: "success",
      message: "OTP sent to your email!",
      otp,
    });
  } catch (error) {
    //reset otp and otp_expiry
    user.otp = undefined;
    user.otp_expiry = undefined;
    await user.save();

    return next(new CustomError("Email could not be sent!", 500));
  }
});

export const verifyOTP = asyncHandler(async (req, res, next) => {
  const { otp, email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) return next(new CustomError("User not found!", 404));

  if (user.otp === String(otp) && user.otp_expiry >= new Date()) {
    const access_token = generateToken(
      user,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE * 60
    );

    const refresh_token = generateToken(
      user,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRE * 60
    );

    res.cookie(
      "access_token",
      access_token,
      cookiesOption(process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE * 60 * 1000)
    );
    res.cookie(
      "refresh_token",
      refresh_token,
      cookiesOption(process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRE * 60 * 1000)
    );
    // reset otp and otp_expiry
    user.otp = undefined;
    user.otp_expiry = undefined;
    await user.save();

    res.status(200).json({ status: "success", message: "OTP verified!" });
  } else {
    next(new CustomError("Invalid OTP or has expired.", 401));
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("access_token", null, cookiesOption(0));
  res.cookie("refresh_token", null, cookiesOption(0));

  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

export const editUser = asyncHandler(async (req, res, next) => {
  const userID = req.params.userID;
  const payload = req.body;

  await User.findByIdAndUpdate(userID, payload);

  res.status(200).json({
    status: "success",
    message: "User Updated successfully",
  });
});

export const getUserByID = asyncHandler(async (req, res, next) => {
  const userID = req.params.userID;

  const user = await User.findById(userID);

  res.status(200).json({
    status: "success",
    message: "Fetched User Data successfully",
    user,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userID = req.params.userID;
  const user = await User.findById(userID);

  if (!user) return next(new CustomError("User not found!", 404));
  else await user.deleteOne();

  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().populate({
    path: "addresses",
    match: { is_active: true },
  });

  res.status(200).json({
    status: "success",
    message: "Fetched all Users successfully",
    users,
  });
});

export const getAllAdmins = asyncHandler(async (req, res, next) => {
  const admins = await User.find({ role: { $ne: "user" } }).select(
    "first_name last_name email phone _id created_at gender role "
  );

  res.status(200).json({
    status: "success",
    message: "Fetched all Admins successfully",
    admins,
  });
});

export const getUserLocationGeoData = asyncHandler(async (req, res, next) => {
  const locations = await Address.aggregate([
    {
      $match: { is_active: true },
    },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        country: "$_id",
        count: 1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    message: "Fetched all Admins successfully",
    locations,
  });
});

export const checkAuth = asyncHandler(async (req, res, next) => {
  const access_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;

  jwt.verify(
    access_token,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        jwt.verify(
          refresh_token,
          process.env.JWT_REFRESH_TOKEN_SECRET,
          async (err, decoded) => {
            if (err) {
              return res.status(200).json({ isLoggedIn: false, user: {} });
            } else {
              const user = await User.findById(decoded?.userID);

              const access_token = generateToken(
                user,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE * 60
              );
              res.cookie(
                "access_token",
                access_token,
                cookiesOption(
                  process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE * 60 * 1000
                )
              );
              return res.status(200).json({ isLoggedIn: true, user });
            }
          }
        );
      } else {
        const user = await User.findById(decoded?.userID);
        return res.status(200).json({ isLoggedIn: true, user });
      }
    }
  );
});

export const getAffiliatePerformance = asyncHandler(async (req, res, next) => {
  const orders = await Order.aggregate([
    {
      $match: {
        "payment.status": "captured",
      },
    },
    {
      $addFields: {
        products: {
          $filter: {
            input: "$products",
            as: "product",
            cond: {
              $not: {
                $in: [
                  "$$product.latest_order_status.status",
                  ["Cancelled", "Returned"],
                ],
              },
            },
          },
        },
      },
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$billing_user_id",
        user_name: { $first: "$billing_user" },
        count: { $sum: 1 },
        total_amount: { $sum: "$products.afterDiscountTotalPrice" },
      },
    },
    {
      $project: {
        _id: 1,
        user_name: 1,
        count: 1,
        total_amount: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: "Fetched all Users successfully",
    orders,
  });
});

export const getDashboardData = asyncHandler(async (req, res, next) => {
  const transactionData = await Order.aggregate([
    {
      $group: {
        _id: "$payment.status",
        count: { $sum: 1 },
        totalAmount: { $sum: "$total_price" },
      },
    },
  ]);

  const ordersData = await Order.aggregate([
    {
      $match: {
        "payment.status": "captured",
      },
    },
    { $unwind: "$products" },
    {
      $facet: {
        totalAmount: [
          {
            $match: {
              "products.latest_order_status.status": {
                $nin: ["Cancelled", "Returned"],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalAfterDiscount: { $sum: "$products.afterDiscountTotalPrice" },
            },
          },
        ],
        orders: [
          {
            $group: {
              _id: "$products.latest_order_status.status",
              count: { $sum: 1 },
              amount: { $sum: "$products.afterDiscountTotalPrice" },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalAmount: { $arrayElemAt: ["$totalAmount.totalAfterDiscount", 0] },
        orders: 1,
        _id: 0,
      },
    },
  ]);

  const productsWithCount = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  const totalProductsCount = productsWithCount.reduce(
    (total, category) => total + category.count,
    0
  );
  const productData = { productsWithCount, totalProductsCount };

  const usersWithCount = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } },
  ]);

  const totalUsersCount = usersWithCount.reduce(
    (total, p) => total + p.count,
    0
  );
  const userData = { usersWithCount, totalUsersCount };

  const totalRevenue = await Order.aggregate([
    {
      $match: {
        "payment.status": "captured",
        "products.latest_order_status.status": {
          $nin: ["Cancelled", "Returned"],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$total_price" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: "Fetched all Users successfully",
    result: {
      transactionData,
      ordersData: ordersData[0],
      productData,
      userData,
      totalRevenue: totalRevenue[0],
    },
  });
});
