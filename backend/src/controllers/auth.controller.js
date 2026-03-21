import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { authService } from "../services/auth/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
};

//////////////////////////////////////////////////////////
// 🔐 OTP FLOW
//////////////////////////////////////////////////////////

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await authService.sendOtp(email);

  res.json(new ApiResponse(200, null, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  await authService.verifyOtp(email, otp);

  res.json(new ApiResponse(200, null, "OTP verified successfully"));
});

//////////////////////////////////////////////////////////
// 👤 REGISTER
//////////////////////////////////////////////////////////

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await authService.registerUser({
    fullname,
    email,
    password,
  });

  res.status(201).json(
    new ApiResponse(201, user, "User registered successfully")
  );
});

//////////////////////////////////////////////////////////
// 🔑 LOGIN
//////////////////////////////////////////////////////////

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } =
    await authService.loginUser(email, password);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, { user, accessToken }, "Login successful")
    );
});

//////////////////////////////////////////////////////////
// 🚪 LOGOUT
//////////////////////////////////////////////////////////

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const refreshToken = req.cookies.refreshToken;

  await authService.logoutUser(req.user._id, refreshToken);

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logout successful"));
});

//////////////////////////////////////////////////////////
// 🔄 REFRESH TOKEN
//////////////////////////////////////////////////////////

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const { user, accessToken, refreshToken: newRefreshToken } =
    await authService.refreshAccessToken(refreshToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json(
      new ApiResponse(200, { user, accessToken }, "Token refreshed")
    );
});

//////////////////////////////////////////////////////////
// 🔐 FORGOT PASSWORD FLOW
//////////////////////////////////////////////////////////

// Step 1: send reset otp
const sendResetOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await authService.sendResetOtp(email);

  res.json(new ApiResponse(200, null, "Reset OTP sent"));
});

// Step 2: verify reset otp
const verifyResetOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  await authService.verifyResetOtp(email, otp);

  res.json(new ApiResponse(200, null, "OTP verified"));
});

// Step 3: reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  await authService.resetPassword(email, otp, newPassword);

  res.json(new ApiResponse(200, null, "Password reset successful"));
});

//////////////////////////////////////////////////////////
// 🔐 CHANGE PASSWORD (LOGGED IN)
//////////////////////////////////////////////////////////

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  await authService.changePassword(
    req.user._id,
    oldPassword,
    newPassword
  );

  res.json(new ApiResponse(200, null, "Password changed successfully"));
});

export {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
  changePassword
};