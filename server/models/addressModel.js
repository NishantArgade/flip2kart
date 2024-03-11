import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  user_name: String,
  phone: Number,
  alternate_phone: Number,
  country: String,
  state: String,
  city: String,
  street: String,
  landmark: String,
  pincode: Number,
  is_active: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

export const Address =
  mongoose.models.Addresses || mongoose.model("Addresses", addressSchema);
