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
