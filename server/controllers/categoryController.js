import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/categoryModel.js";

export const allCategories = expressAsyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all categories successfully",
    categories,
  });
});

export const addCategory = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Category.create(body);

  res.status(200).json({
    status: "success",
    message: "Category added successfully",
  });
});

export const editCategory = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.categoryID;
  const body = req.body;
  await Category.findByIdAndUpdate(id, body);

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
  });
});

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.categoryID;

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
});
