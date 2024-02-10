import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  otp: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    set: (timestamp) => new Date(timestamp),
    get: (timestamp) => timestamp.getTime(),
  },
});

export const OTP = mongoose.models.OTPs || mongoose.model("OTPs", otpSchema);
