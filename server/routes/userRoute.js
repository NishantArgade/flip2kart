import { Router } from "express";
import {
  loginUser,
  regiserUser,
  verifyOTP,
  editUser,
  deleteUser,
  getAllUsers,
  logoutUser,
  checkAuth,
} from "../controllers/userController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/register").post(regiserUser);

router.route("/logout").get(logoutUser);

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

router.route("/auth/check").get(checkAuth);

export default router;
