import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connection with db established"))
    .catch((err) => console.log("error in db connection", err));
};
