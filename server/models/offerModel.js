import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  offer: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Offer =
  mongoose.models.Offers || mongoose.model("Offers", offerSchema);
