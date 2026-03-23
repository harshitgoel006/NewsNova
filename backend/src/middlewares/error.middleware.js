import { ApiError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  try {
    let error = err;

    if (!(error instanceof ApiError)) {
      error = new ApiError(
        error.statusCode || 500,
        error.message || "Internal Server Error"
      );
    }

    logger.error({
      message: error.message,
      stack: error.stack,
      path: req.originalUrl,
    });

    if (res.headersSent) {
      return next(error);
    }

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
      }),
    });

  } catch (e) {
    console.error("🔥 Error inside errorHandler:", e);
    return res.status(500).json({
      success: false,
      message: "Critical server error",
    });
  }
};

export { errorHandler };