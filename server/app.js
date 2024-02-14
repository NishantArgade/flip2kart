import express from "express";
import "./config/dotenvConfig.js";

import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productReviewRoute from "./routes/productReviewRoute.js";
import addressRoute from "./routes/addressRoute.js";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api", productReviewRoute);
app.use("/api", addressRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);
