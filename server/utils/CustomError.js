export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;

    if (statusCode >= 200 && statusCode < 300) this.status = "success";
    else if (statusCode >= 400 && statusCode < 500) this.status = "fail";
    else if (statusCode >= 500) this.status = "error";

    Error.captureStackTrace(this, this.constructor);
  }
}
