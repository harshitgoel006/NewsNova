import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { userService } from "../services/user.service.js";

//////////////////////////////////////////////////////////
// GET CURRENT USER
//////////////////////////////////////////////////////////

const getCurrentUser = asyncHandler(async (req, res) => {

  const user = await userService.getCurrentUser(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, user, "User fetched successfully")
  );
});

//////////////////////////////////////////////////////////
// UPDATE PROFILE
//////////////////////////////////////////////////////////

const updateProfile = asyncHandler(async (req, res) => {

  const user = await userService.updateProfile(
    req.user._id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(200, user, "Profile updated successfully")
  );
});

//////////////////////////////////////////////////////////
// UPDATE INTERESTS
//////////////////////////////////////////////////////////

const updateInterests = asyncHandler(async (req, res) => {

  const user = await userService.updateInterests(
    req.user._id,
    req.body.interests
  );

  return res.status(200).json(
    new ApiResponse(200, user, "Interests updated successfully")
  );
});

export {
  getCurrentUser,
  updateProfile,
  updateInterests
};