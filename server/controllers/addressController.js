import expressAsyncHandler from "express-async-handler";
import { Address } from "../models/addressModel.js";

export const addAddress = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Address.create(body);

  res.status(200).json({
    status: "success",
    message: "Address created successfully",
  });
});

export const editAddress = expressAsyncHandler(async (req, res, next) => {
  const addressID = req.params.addressID;
  const body = req.body;

  await Address.findByIdAndUpdate(addressID, body);

  res.status(200).json({
    status: "success",
    message: "Address updated successfully",
  });
});

export const deleteAddress = expressAsyncHandler(async (req, res, next) => {
  const addressID = req.params.addressID;
  await Address.findByIdAndDelete(addressID);

  res.status(200).json({
    status: "success",
    message: "Address deleted successfully",
  });
});

export const setActiveAddress = expressAsyncHandler(async (req, res, next) => {
  const addressID = req.params.addressID;
  const userID = req.user._id;

  await Address.updateMany({ user_id: userID }, { isActive: false });
  await Address.findByIdAndUpdate(addressID, { isActive: true });

  res.status(200).json({
    status: "success",
    message: "Address set active successfully",
  });
});

export const allMyAddress = expressAsyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  const addresses = await Address.find({ user_id: userID });

  res.status(200).json({
    status: "success",
    message: "Fetched all my Address successfully",
    addresses,
  });
});
