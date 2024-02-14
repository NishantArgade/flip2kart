import asyncHandler from "express-async-handler";
import { OTP } from "../models/otpModel.js";
import { User } from "../models/userModel.js";
import { CustomError } from "../utils/CustomError.js";
import { sendMail } from "../utils/sendMail.js";
import { cookiesOption, generateToken } from "../utils/helper.js";

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new CustomError("User not found!", 404));

  //send otp to mail
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 6-digit OTP

  const subject = "OTP for Login Verification";

  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 5px;">
  <h1 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Login Verification</h1>
  <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">Dear User,</p>
  <p style="font-size: 16px; line-height: 1.5;">You are receiving this email because a login attempt was made for your account on Our Application. Please enter the following One-Time Password (OTP) to verify your identity and proceed with your login:</p>
  <p style="font-size: 20px; color: blue; font-weight: bold; margin: 20px 0;">${otp}</p>
  <p style="font-size: 16px; line-height: 1.5;">This OTP is valid for 10 minutes from the time it was sent. If you did not request this OTP, please ignore this email and consider changing your password as a precaution.</p>
  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0;">Best Regards,</p>
  <p style="font-size: 16px; line-height: 1.5; margin-top: 0;">Flip2Kart Team</p>
  </div>`;

  //save otp in db
  await OTP.findOneAndUpdate(
    { user_id: user._id },
    {
      user_id: user._id,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
    },
    { upsert: true }
  );

  try {
    await sendMail(email, subject, html);

    res.status(200).json({
      status: "success",
      message: "OTP sent to your email!",
      otp,
    });
  } catch (error) {
    await OTP.findOneAndUpdate(
      { user_id: user._id },
      {
        user_id: user._id,
        otp: undefined,
        otpExpire: undefined,
      }
    );
    return next(new CustomError("Email could not be sent!", 500));
  }
});

export const verifyOTP = asyncHandler(async (req, res, next) => {
  const { otp, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new CustomError("User not found!", 404));

  const isOtpExists = await OTP.findOne({
    user_id: user._id,
    otp,
    otpExpire: { $gt: Date.now() },
  });

  if (!isOtpExists)
    return next(new CustomError("Invalid OTP or has expired", 404));

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
  await OTP.findOneAndDelete({ otp, user_id: user._id });

  res
    .status(200)
    .json({ status: "success", message: "OTP verified!", access_token });
});

export const regiserUser = asyncHandler(async (req, res, next) => {
  const body = req.body;
  await User.create(body);
  res.status(200).json({ body });
});

export const editUser = asyncHandler(async (req, res, next) => {
  const userID = req.params.userID;
  const body = req.body;

  await User.findByIdAndUpdate(userID, body);

  res
    .status(200)
    .json({ status: "success", message: "User updated successfully" });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userID = req.params.userID;

  await User.findByIdAndDelete(userID);

  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all Users successfully",
    users,
  });
});
