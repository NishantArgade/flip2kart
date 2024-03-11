import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/productModel.js";

export const allCategories = expressAsyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all categories successfully",
    categories,
  });
});

export const getBrandsByCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { name, category } = req.body;
    let brands = [];
    let min_price, max_price;

    if (name) {
      const escapedName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = { $regex: new RegExp(escapedName, "i") };

      const searchObj = {
        $or: [
          { name: regex },
          { description: regex },
          { category: regex },
          { brands: regex },
        ],
      };

      const products = await Product.find(searchObj);

      if (
        products.every((product) => product.category === products[0].category)
      ) {
        brands = products.map((product) => product.brand);
        brands = [...new Set(brands)];

        const data = await Category.findOne({
          name: products[0].category,
        });
        min_price = data?.min_price;
        max_price = data?.max_price;
      }
    } else if (category) {
      const data = await Category.findOne({
        name: category,
      });

      const products = await Product.find({ category });
      brands = products.map((product) => product.brand);
      brands = [...new Set(brands)];

      min_price = data?.min_price;
      max_price = data?.max_price;
    }

    res.status(200).json({
      status: "success",
      message: "Fetched all categories successfully",
      priceRange: { min: min_price, max: max_price },
      brands,
    });
  }
);

export const addCategory = expressAsyncHandler(async (req, res, next) => {
  const { category, brands, min_price, max_price } = req.body;

  const brandsArray = JSON.parse(brands);

  await Category.create({
    user_id: req.user._id,
    image: { url: req?.file?.path, filename: req?.file?.filename },
    name: category,
    brands: brandsArray,
    min_price,
    max_price,
  });

  res.status(200).json({
    status: "success",
    message: "Category added successfully",
  });
});

export const editCategory = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.categoryID;

  const { category, brands, min_price, max_price, image } = req.body;
  const brandsArray = JSON.parse(brands);

  const updatedObj = {
    name: category,
    brands: brandsArray,
    min_price,
    max_price,
  };

  if (req?.file)
    updatedObj.image = { url: req.file.path, filename: req.file.filename };
  else {
    const parsedImage = JSON.parse(image);
    updatedObj.image = {
      url: parsedImage?.url,
      filename: parsedImage?.filename,
    };
  }

  await Category.findByIdAndUpdate(id, updatedObj);

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
  });
});

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.categoryID;
  const image = req.body.image;

  await cloudinary.uploader.destroy(image?.filename);
  await Category.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
  });
});
