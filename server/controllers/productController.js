import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";
import { Address } from "../models/addressModel.js";

export const addProduct = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Product.create(body);
  res.json({
    status: "success",
    message: "Product added successfully",
  });
});

export const editProduct = expressAsyncHandler(async (req, res, next) => {
  const productID = req.params.productID;
  const body = req.body;
  await Product.findByIdAndUpdate(productID, body);
  res.json({
    status: "success",
    message: "Product updated successfully",
  });
});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const productID = req.params.productID;

  await Product.findByIdAndDelete(productID);
  res.json({
    status: "success",
    message: "Product deleted successfully",
  });
});

export const allProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.json({
    status: "success",
    message: "Fetched all products",
    products,
  });
});
