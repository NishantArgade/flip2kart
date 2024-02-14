import { CustomError } from "../utils/CustomError.js";

function devErrors(res, error) {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error,
  });
}

function prodErrors(res, error) {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(error.statusCode).json({
      status: "error",
      message: "something went wrong please, try again later!",
    });
  }
}
export function errorHandler(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") {
      error = new CustomError("Invalid ID", 400);
    }

    prodErrors(res, error);
  }
}
