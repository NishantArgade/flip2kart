import { Router } from "express";
import {
  addProduct,
  toggleProductInWhislist,
  editProduct,
  deleteProduct,
  allProducts,
  getSingleProductDetail,
  uploadProductImages,
  deleteProductImage,
  getMyWishlist,
  getProductsByCategory,
  filteredProducts,
  deleteUploadedImg,
} from "../controllers/productController.js";
import { protect, restrict } from "../middlewares/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flip2kart",
    public_id: (req, file) => path.parse(file.originalname).name,
  },
});

const upload = multer({ storage: storage });

router
  .route("/add-product")
  .post(protect, restrict("admin", "operator"), addProduct);

router
  .route("/toggle-product-in-whislist")
  .post(protect, toggleProductInWhislist);

router.route("/my-wishlist").get(protect, getMyWishlist);

router
  .route("/edit-product/:productID")
  .patch(protect, restrict("admin", "operator"), editProduct);

router
  .route("/delete-product/:productID")
  .delete(protect, restrict("admin", "operator"), deleteProduct);

router.route("/all-products").get(allProducts);

router.route("/filter-products").get(filteredProducts);

router.route("/product-detail/:productID").get(getSingleProductDetail);

router.route("/category-products/:category").get(getProductsByCategory);

router
  .route("/upload-product-imgs")
  .post(
    protect,
    restrict("admin", "operator"),
    upload.array("images"),
    uploadProductImages
  );

router
  .route("/delete-product-imgs")
  .post(protect, restrict("admin", "operator"), deleteProductImage);

router.route("/delete-uploaded-img").post(protect, deleteUploadedImg);

export default router;
