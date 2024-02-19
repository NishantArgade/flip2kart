import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  offer: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

export const Offer =
  mongoose.models.Offers || mongoose.model("Offers", offerSchema);
