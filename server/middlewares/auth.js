import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { cookiesOption, generateToken } from "../utils/helper.js";
import { CustomError } from "../utils/CustomError.js";

export const protect = async (req, res, next) => {
  const access_token = req.cookies?.access_token || req.headers?.authorization;
  try {
    if (access_token) {
      const decode = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      req.user = await User.findById(decode?.userID);
      next();
    } else {
      const refresh_token = req.cookies?.refresh_token;

      const decode = jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decode?.userID);
      const access_token = generateToken(
        user,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE * 60
      );
      res.cookie(
        "access_token",
        access_token,
        cookiesOption(process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE * 60 * 1000)
      );

      next();
    }
  } catch (error) {
    res.cookie("access_token", "", cookiesOption(0));
    res.cookie("refresh_token", "", cookiesOption(0));

    return next(new CustomError("Authorization failed!", 401));
  }
};

export const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new CustomError("You are not allowed to perform thi action", 403)
      );
    else next();
  };
};
