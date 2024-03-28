import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  price: Number,
  discount: Number,
  category: String,
  brand: String,
  stock: { type: Number, default: 0 },
  seller: String,
  seller_address: String,
  delivery_estimate_days: { type: Number, default: 0 },
  spotlight: [
    {
      title: String,
      description: [String],
    },
  ],
  offers: [String],
  specifications: [
    {
      category: String,
      items: [
        {
          title: String,
          description: String,
        },
      ],
    },
  ],
  rating_review: {
    overall_rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    review_count: { type: Number, default: 0 },
    classify_ratings: {
      1: { type: Number, default: 0, required: true },
      2: { type: Number, default: 0, required: true },
      3: { type: Number, default: 0, required: true },
      4: { type: Number, default: 0, required: true },
      5: { type: Number, default: 0, required: true },
    },
  },
  created_at: { type: Date, default: Date.now },
});

export const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);
