import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { CustomError } from "../utils/CustomError.js";
import { sendMail } from "../utils/sendMail.js";
import { cookiesOption, generateOTP, generateToken } from "../utils/helper.js";
import jwt from "jsonwebtoken";

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(
      new CustomError("You are not registered with us. Please sign up.", 404)
    );

  //send otp to mail
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

  //save otp in db
  user.otp = otp;
  user.otp_expiry = Date.now() + otpExpiry * 60 * 1000;
  await user.save();

  try {
    await sendMail(email, subject, html);

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

  //send otp to mail
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

  //save otp in db
  const user = await User.create({
    email,
    otp,
    otp_expiry: Date.now() + otpExpiry * 60 * 1000,
  });

  try {
    await sendMail(email, subject, html);

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

export const checkAuth = asyncHandler(async (req, res, next) => {
  const access_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;

  jwt.verify(
    access_token,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        jwt.verify(
          refresh_token,
          process.env.JWT_REFRESH_TOKEN_SECRET,
          (err, decoded) => {
            if (err) {
              return res.status(200).json({ isLoggedIn: false, user: {} });
            } else {
              const access_token = generateToken(
                decoded,
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
              return res.status(200).json({ isLoggedIn: true, user: decoded });
            }
          }
        );
      } else {
        console.log(decoded);
        return res.status(200).json({ isLoggedIn: true, user: decoded });
      }
    }
  );
});
