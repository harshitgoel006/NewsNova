import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {

  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid access token");
  }

  const user = await User.findById(decoded._id).select("+isActive");

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account inactive");
  }

  if (user.passwordChangedAt) {
    const tokenIssuedAt = decoded.iat * 1000;

    if (tokenIssuedAt < user.passwordChangedAt.getTime()) {
      throw new ApiError(401, "Session expired. Please login again.");
    }
  }

  req.user = user;

  next();

});