import { Router } from "express";
import {
  loginUser,
  regiserUser,
  verifyOTP,
  editUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/register").post(regiserUser);

router.route("/verify-otp").post(verifyOTP);

router
  .route("/edit-user/:userID")
  .patch(protect, restrict("admin", "operator"), editUser);

router
  .route("/delete-user/:userID")
  .delete(protect, restrict("admin", "operator"), deleteUser);

router
  .route("/all-users")
  .get(protect, restrict("admin", "operator"), getAllUsers);

export default router;
