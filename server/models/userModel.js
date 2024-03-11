import mongoose from "mongoose";
import { Address } from "./addressModel.js";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  phone: String,
  email: { type: String, unique: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "operator"],
    default: "user",
  },
  otp: String,
  otp_expiry: Date,
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addresses",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
});

// Middleware to delete addresses when a user is deleted
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Address.deleteMany({ _id: { $in: this.addresses } });
    next();
  }
);

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
