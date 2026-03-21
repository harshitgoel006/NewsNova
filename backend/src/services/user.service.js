import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const userService = {

//////////////////////////////////////////////////////////
// GET CURRENT USER
//////////////////////////////////////////////////////////

async getCurrentUser(userId) {

  if (!userId) throw new ApiError(400, "User ID required");

  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  if (!user.isActive) {
    throw new ApiError(403, "Account inactive");
  }

  return user;
},

//////////////////////////////////////////////////////////
// UPDATE PROFILE
//////////////////////////////////////////////////////////

async updateProfile(userId, data) {

  const { fullname, country } = data;

  if (!fullname && !country) {
    throw new ApiError(400, "At least one field required");
  }

  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  if (!user.isActive) {
    throw new ApiError(403, "Account inactive");
  }

  if (fullname) user.fullname = fullname.trim();

  if (country) user.country = country.toLowerCase();

  await user.save();

  return user;
},

//////////////////////////////////////////////////////////
// UPDATE INTERESTS
//////////////////////////////////////////////////////////

async updateInterests(userId, interests) {

  if (!Array.isArray(interests) || interests.length === 0) {
    throw new ApiError(400, "Invalid interests");
  }

  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  if (!user.isActive) {
    throw new ApiError(403, "Account inactive");
  }

  user.interests = interests;

  await user.save();

  return user;
}

};