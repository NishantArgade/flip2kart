import { Router } from "express";
import { loginUser, regiserUser } from "../controllers/userController.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(regiserUser);

export default router;
