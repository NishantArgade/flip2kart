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
  otpExpire: {
    type: Date,
  },
});

export const OTP = mongoose.models.OTPs || mongoose.model("OTPs", otpSchema);
