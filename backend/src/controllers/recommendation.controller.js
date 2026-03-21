import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { recommendationService } from "../services/recommendation.service.js";

const getRecommendations = asyncHandler(async (req,res)=>{

  const recommendations =
    await recommendationService.getRecommendations(
      req.user._id
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      recommendations,
      "Recommended news fetched"
    )
  );

});


export { getRecommendations };