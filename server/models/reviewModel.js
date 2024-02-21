import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  rating: Number,
  comment: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

export const Review =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);