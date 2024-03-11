import { Router } from "express";
import { protect, restrict } from "../middlewares/auth.js";
import {
  addCategory,
  allCategories,
  deleteCategory,
  editCategory,
  getBrandsByCategory,
} from "../controllers/categoryController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

const router = Router();

const conditionalUpload = (req, res, next) => {
  if (req.body.image instanceof File) {
    upload.single("image")(req, res, next);
  } else {
    next();
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flip2kart-categories",
    public_id: (req, file) => path.parse(file.originalname).name,
  },
});

const upload = multer({ storage: storage });

router.route("/all-categories").get(allCategories);

router.route("/brands-by-category/:category").get(getBrandsByCategory);

router
  .route("/add-category")
  .post(
    protect,
    restrict("admin", "operator"),
    upload.single("image"),
    addCategory
  );

router
  .route("/edit-category/:categoryID")
  .patch(
    protect,
    restrict("admin", "operator"),
    upload.single("image"),
    editCategory
  );

router
  .route("/delete-category/:categoryID")
  .delete(protect, restrict("admin", "operator"), deleteCategory);

export default router;
