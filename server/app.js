import express from "express";
import "./config/dotenvConfig.js";
import { v2 as cloudinary } from "cloudinary";

import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import addressRoute from "./routes/addressRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import officeRoute from "./routes/officeRoute.js";
import offerRoute from "./routes/offerRoute.js";

export const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.use("/api", addressRoute);
app.use("/api", categoryRoute);
app.use("/api", reviewRoute);
app.use("/api", officeRoute);
app.use("/api", offerRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);
