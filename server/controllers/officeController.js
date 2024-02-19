import expressAsyncHandler from "express-async-handler";
import { Office } from "../models/officeModel.js";

export const allOffices = expressAsyncHandler(async (req, res, next) => {
  const offices = await Office.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all offices successfully",
    offices,
  });
});

export const addOffice = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Office.create(body);

  res.status(200).json({
    status: "success",
    message: "Office added successfully",
  });
});

export const editOffice = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.officeID;
  const body = req.body;
  await Office.findByIdAndUpdate(id, body);

  res.status(200).json({
    status: "success",
    message: "Office updated successfully",
  });
});

export const deleteOffice = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.officeID;

  await Office.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Office deleted successfully",
  });
});
