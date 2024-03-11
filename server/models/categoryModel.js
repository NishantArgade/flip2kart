import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: String,
    required: true,
  },
  brands: [String],
  image: {
    url: String,
    filename: String,
  },
  min_price: { type: Number, default: 0 },
  max_price: { type: Number, default: 1000000 },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

export const Category =
  mongoose.models.Categories || mongoose.model("Categories", categorySchema);
