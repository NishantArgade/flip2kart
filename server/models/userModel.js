import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  address: String,
  gender: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
