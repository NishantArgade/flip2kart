import expressAsyncHandler from "express-async-handler";
import { Address } from "../models/addressModel.js";

export const addAddress = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;

  // Check if there are any addresses in the Address model
  const existingAddresses = await Address.find({ user_id: req.user._id });

  // If there are no addresses, set is_active to true. Otherwise, set it to false
  const isActive = existingAddresses.length === 0;

  await Address.create({ user_id: req.user._id, is_active: isActive, ...body });

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

export const editActiveAddress = expressAsyncHandler(async (req, res, next) => {
  const addressID = req.params.addressID;

  await Address.findOneAndUpdate(
    { user_id: req.user._id, is_active: true },
    { is_active: false },
    { returnOriginal: false }
  );

  await Address.findByIdAndUpdate(
    addressID,
    { is_active: true },
    { new: true }
  );

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
