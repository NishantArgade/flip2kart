import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";
import { CustomError } from "../utils/CustomError.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Product.create(body);
  res.status(200).json({
    status: "success",
    message: "Product added successfully",
  });
});

export const editProduct = expressAsyncHandler(async (req, res, next) => {
  const productID = req.params.productID;
  const body = req.body;
  await Product.findByIdAndUpdate(productID, body);
  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
  });
});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const productID = req.params.productID;

  await Product.findByIdAndDelete(productID);
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

export const allProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    message: "Fetched all products",
    products,
  });
});

export const uploadProductImages = (req, res) => {
  const uploadedImages = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  res.status(200).json({ uploadedImages });
};

export const deleteProductImage = expressAsyncHandler(
  async (req, res, next) => {
    const images = req.body.images;

    const deletePromises = images.map((item) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(item.filename, function (error, result) {
          if (error) reject(error);
          else resolve(result);
        });
      });
    });

    Promise.all(deletePromises)
      .then(() => res.status(200).json({ message: "Images deleted" }))
      .catch((error) => {
        next(new CustomError("An error occurred while deleting images", 500));
      });
  }
);
