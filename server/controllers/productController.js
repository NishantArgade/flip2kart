import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";
import { CustomError } from "../utils/CustomError.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/userModel.js";

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

  const product = await Product.findByIdAndDelete(productID).select("images");

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    product,
  });
});

export const allProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find().select(
    "-images -seller -seller_address -spotlight -offers -specifications -rating_review -delivery_estimate_days"
  );
  res.status(200).json({
    status: "success",
    message: "Fetched all products",
    products,
  });
});

export const topOfferProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find({ discount: { $gte: 50 } }).select(
    "name description images price discount"
  );
  res.status(200).json({
    status: "success",
    message: "Fetched all products",
    products,
  });
});

export const filteredProducts = expressAsyncHandler(async (req, res, next) => {
  const searchObj = {};
  let sortObj = {};

  let page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  let skip = (page - 1) * limit;

  if (req.query?.category) searchObj.category = req.query.category;
  if (req.query?.brand) searchObj.brand = { $in: req.query.brand.split(",") };

  if (req.query?.rating) {
    const minRating = Math.min(
      ...req.query.rating.split(",").map((r) => Number(r))
    );
    searchObj.overall_rating = {
      $gte: minRating,
    };
  }
  if (req.query?.discount) {
    const minDiscount = Math.min(
      ...req.query.discount.split(",").map((d) => Number(d))
    );
    searchObj.discount = {
      $gte: minDiscount,
    };
  }

  if (req.query?.minPrice)
    searchObj.price = {
      ...searchObj.price,
      $gte: Number(req.query.minPrice),
    };

  if (req.query?.maxPrice)
    searchObj.price = { ...searchObj.price, $lte: Number(req.query.maxPrice) };

  if (req.query?.sort === "popularity") sortObj = { overall_rating: -1 };
  if (req.query?.sort === "price-low-to-high") sortObj = { price: 1 };
  if (req.query?.sort === "price-high-to-low") sortObj = { price: -1 };
  if (req.query?.sort === "newest-first") sortObj = { created_at: -1 };

  if (req.query?.name) {
    const escapedName = req.query.name.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&"
    );
    const regex = { $regex: new RegExp(escapedName, "i") };

    searchObj.$or = [
      { name: regex },
      { description: regex },
      { category: regex },
      { brands: regex },
    ];
  }

  if (req.query?.delivery === "one_day") {
    searchObj.delivery_estimate_days = 1;
  }

  if (req.query?.availability === "ExcludeOutOfStock") {
    searchObj.stock = { $gt: 0 };
  }

  let products = await Product.find(searchObj)
    .sort(sortObj)
    .skip(skip)
    .limit(limit)
    .select(
      "-description -seller -seller_address -spotlight -offers -specifications"
    );

  const totalProductsCount = await Product.find(searchObj).countDocuments();

  const totalPages = Math.ceil(totalProductsCount / limit);

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalProductsCount);

  res.status(200).json({
    status: "success",
    message: "Fetched all products",
    products,
    totalProductsCount,
    totalPages,
    start,
    end,
  });
});

export const getProductsByCategory = expressAsyncHandler(
  async (req, res, next) => {
    const category = req.params.category;

    const products = await Product.find({ category }).select(
      "-spotlight -offers -specifications"
    );

    res.status(200).json({
      status: "success",
      message: "Fetched all products",
      products,
    });
  }
);

export const getMyWishlist = expressAsyncHandler(async (req, res, next) => {
  const products = await User.findOne({ _id: req.user._id })
    .populate("wishlist", "name images price discount rating_review")
    .select("wishlist");

  res.status(200).json({
    status: "success",
    message: "Fetched all products",
    wishlist: products.wishlist,
  });
});

export const getSingleProductDetail = expressAsyncHandler(
  async (req, res, next) => {
    const product = await Product.findById(req.params.productID);

    res.status(200).json({
      status: "success",
      message: "Fetched product detail",
      product,
    });
  }
);

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
        cloudinary.uploader.destroy(item?.filename, function (error, result) {
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

export const deleteUploadedImg = expressAsyncHandler(async (req, res, next) => {
  const filename = req.body.filename;
  await cloudinary.uploader.destroy(filename);

  res.status(200).json({ message: "Image deleted" });
});

export const toggleProductInWhislist = expressAsyncHandler(
  async (req, res, next) => {
    const productID = req.body.productID;
    const user = req.user;

    if (user.wishlist.includes(productID))
      user.wishlist = user.wishlist.filter((item) => item != productID);
    else user.wishlist = [...user.wishlist, productID];

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Added to Favorite",
    });
  }
);

export const addProductToCart = expressAsyncHandler(async (req, res, next) => {
  const productID = req.params.productID;
  const user = req.user;

  const isProductExist = user?.cart?.find((c) => c.product == productID);
  if (!isProductExist) {
    user.cart = [{ product: productID }, ...user.cart];
    await user.save();
  }

  res.status(200).json({
    status: "success",
    message: "Added product to Cart",
  });
});

export const updateAddToCartProduct = expressAsyncHandler(
  async (req, res, next) => {
    const { quantity, product: productID } = req.body;
    const user = req.user;

    const isProductExist = user?.cart?.find((c) => c.product == productID);
    if (isProductExist) {
      user.cart = user.cart.map((item) => {
        if (item.product == productID) {
          item.quantity = quantity || 1;
        }
        return item;
      });
      await user.save();
    }

    const updatedProduct = await Product.findById(productID).select("name");

    res.status(200).json({
      status: "success",
      message: "Updated product Cart",
      updatedProduct: { product: updatedProduct, quantity },
    });
  }
);

export const removeProductFromCart = expressAsyncHandler(
  async (req, res, next) => {
    const productID = req.params.productID;
    const user = req.user;

    user.cart = user.cart.filter((item) => item.product != productID);
    await user.save();

    const removedProduct = await Product.findById(productID).select("name");

    res.status(200).json({
      status: "success",
      message: "Removed product from Cart",
      removedProduct,
    });
  }
);

export function calculateDiscountAmount(originalPrice, discountRate) {
  discountRate = discountRate / 100;

  if (discountRate === 1) {
    return originalPrice;
  }

  const discountedPrice = originalPrice * (1 - discountRate);
  const price = Math.floor(discountedPrice / 100) * 100 - 1;
  const discountAmount = originalPrice - price;

  return discountAmount;
}

function calculateDiscountedPrice(originalPrice, discountRate) {
  discountRate = discountRate / 100;

  if (discountRate === 1) {
    return 0;
  }
  const discountedPrice = originalPrice * (1 - discountRate);
  let price = Math.floor(discountedPrice / 100) * 100 - 1;
  return price;
}

export const getCartProducts = expressAsyncHandler(async (req, res, next) => {
  const data = await User.findById(req.user._id)
    .populate(
      "cart.product",
      "-spotlight -offers -specifications -rating_review"
    )
    .select("cart");

  let totalPrice = 0;
  let totalDiscount = 0;
  let totalDeliveryCharges = 0;
  let packagingFee = 0;
  let finalTotalAmount = 0;

  data?.cart?.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
    totalDiscount +=
      calculateDiscountAmount(item.product.price, item.product.discount) *
      item.quantity;

    const discountPrice = calculateDiscountedPrice(
      item.product.price,
      item.product?.discount
    );

    totalDeliveryCharges += (discountPrice <= 2000 ? 40 : 70) * item.quantity;
  });

  finalTotalAmount = totalPrice - totalDiscount;
  const isDeliveryFree = finalTotalAmount > 200;
  finalTotalAmount += !isDeliveryFree ? totalDeliveryCharges : 0;

  if (finalTotalAmount >= 10000) packagingFee = 59;

  finalTotalAmount += packagingFee;

  res.status(200).json({
    status: "success",
    message: "Fetched Cart",
    cart: data?.cart || [],
    totalPrice,
    isDeliveryFree,
    totalDiscount,
    totalDeliveryCharges,
    packagingFee,
    finalTotalAmount,
  });
});

export const singleProductBillData = expressAsyncHandler(
  async (req, res, next) => {
    const product = await Product.findById(req.query.product).select(
      "-spotlight -offers -specifications"
    );
    const qty = Number(req.query.qty);

    let totalPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryCharges = 0;
    let packagingFee = 0;
    let finalTotalAmount = 0;

    totalPrice += product.price * qty;
    totalDiscount +=
      calculateDiscountAmount(product.price, product.discount) * qty;

    const discountPrice = calculateDiscountedPrice(
      product.price,
      product?.discount
    );

    totalDeliveryCharges += (discountPrice <= 2000 ? 40 : 70) * qty;

    finalTotalAmount = totalPrice - totalDiscount;
    const isDeliveryFree = finalTotalAmount > 200;
    finalTotalAmount += !isDeliveryFree ? totalDeliveryCharges : 0;

    if (finalTotalAmount >= 10000) packagingFee = 59;

    finalTotalAmount += packagingFee;

    res.status(200).json({
      status: "success",
      message: "Fetched Cart",
      cart: [{ product: product, quantity: qty }],
      totalPrice,
      isDeliveryFree,
      totalDiscount,
      totalDeliveryCharges,
      packagingFee,
      finalTotalAmount,
    });
  }
);
