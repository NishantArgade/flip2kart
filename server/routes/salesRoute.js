import { Router } from "express";
import {
  getDailySalesData,
  getMonthlySalesData,
  getSalesBreakdownData,
} from "../controllers/salesController.js";

const router = Router();

router.route("/monthly-sales-data").get(getMonthlySalesData);

router.route("/daily-sales-data").get(getDailySalesData);

router.route("/sales-breakdown-data").get(getSalesBreakdownData);

export default router;
