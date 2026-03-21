import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { trendingService } from "../services/trending.service.js";

const getTrending = asyncHandler(async (req,res)=>{

  const limit = req.query.limit || 10;

  const trending =
    await trendingService.getTrending(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      trending,
      "Trending news fetched"
    )
  );

});


export { getTrending };