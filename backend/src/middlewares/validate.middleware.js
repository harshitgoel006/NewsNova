import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {

  try {

    const result = schema.parse(req.body);

    req.body = result;

    next();

  } catch (error) {

    const message =
      error.errors?.[0]?.message || "Invalid request data";

    next(new ApiError(400, message));

  }

};