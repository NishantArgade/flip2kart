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
  getUserByID,
  getAllAdmins,
  getAffiliatePerformance,
  getUserLocationGeoData,
  getDashboardData,
} from "../controllers/userController.js";
import { protect, restrict } from "../middlewares/auth.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/register").post(regiserUser);

router.route("/logout").get(logoutUser);

router.route("/verify-otp").post(verifyOTP);

router.route("/edit-user/:userID").patch(protect, editUser);

router.route("/user/:userID").get(protect, getUserByID);

router
  .route("/delete-user/:userID")
  .delete(protect, restrict("admin", "operator"), deleteUser);

router
  .route("/all-users")
  .get(protect, restrict("admin", "operator"), getAllUsers);

router
  .route("/affiliate-performance")
  .get(protect, restrict("admin", "operator"), getAffiliatePerformance);

router
  .route("/all-admins")
  .get(protect, restrict("admin", "operator"), getAllAdmins);

router
  .route("/user-location-geo-data")
  .get(protect, restrict("admin", "operator"), getUserLocationGeoData);

router
  .route("/dashboard-data")
  .get(protect, restrict("admin", "operator"), getDashboardData);

router.route("/auth/check").get(checkAuth);

export default router;
