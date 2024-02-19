import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
  manager: String,
  country: String,
  state: String,
  city: String,
  phone: String,
  landline: String,
  email: String,
  established_at: {
    type: Date,
    default: Date.now,
  },
});

export const Office =
  mongoose.models.Offices || mongoose.model("Offices", officeSchema);
