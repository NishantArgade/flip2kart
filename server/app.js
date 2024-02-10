import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoute from "./routes/userRoute.js";
export const app = express();
config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);
