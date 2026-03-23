import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  try {

    const data = {
      body: req.body,
      query: req.query,
      params: req.params, // ✅ ADD THIS
    };

    const result = schema.parse(data);

    req.body = result.body || req.body;
req.query = result.query || req.query;
req.params = result.params || req.params;

next();

  } catch (error) {
    const message =
      error.errors?.[0]?.message || "Invalid request data";

    next(new ApiError(400, message));
  }
};