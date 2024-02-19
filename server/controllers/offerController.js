import expressAsyncHandler from "express-async-handler";
import { Offer } from "../models/offerModel.js";

export const allOffers = expressAsyncHandler(async (req, res, next) => {
  const offers = await Offer.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all offers successfully",
    offers,
  });
});

export const addOffer = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Offer.create(body);

  res.status(200).json({
    status: "success",
    message: "Offer added successfully",
  });
});

export const editOffer = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.offerID;
  const body = req.body;
  await Offer.findByIdAndUpdate(id, body);

  res.status(200).json({
    status: "success",
    message: "Offer updated successfully",
  });
});

export const deleteOffer = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.offerID;

  await Offer.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Offer deleted successfully",
  });
});
