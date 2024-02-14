import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: { type: String, unique: true },
  address: String,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "operator"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
