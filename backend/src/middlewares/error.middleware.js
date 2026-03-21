import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {

  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error"
    );
  }

  // 🔥 log error
  logger.error({
    message: error.message,
    stack: error.stack,
    path: req.originalUrl
  });

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack
    })
  });
};

export { errorHandler };