import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { newsService } from "../services/news.service.js";

//////////////////////////////////////////////////////////
// TOP HEADLINES
//////////////////////////////////////////////////////////

const getTopHeadlines = asyncHandler(async (req, res) => {

  const country = req.query.country || "in";

  const news = await newsService.getTopHeadlines(country);

  return res.status(200).json(
    new ApiResponse(
      200,
      news,
      "Top headlines fetched successfully"
    )
  );

  
});

//////////////////////////////////////////////////////////
// CATEGORY NEWS
//////////////////////////////////////////////////////////

const getCategoryNews = asyncHandler(async (req, res) => {

  const category = req.params.category;
  const country = req.query.country || "in";

  const news = await newsService.getCategoryNews(
    category,
    country
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      news,
      "Category news fetched successfully"
    )
  );

});

//////////////////////////////////////////////////////////
// SEARCH NEWS
//////////////////////////////////////////////////////////

const searchNews = asyncHandler(async (req, res) => {

  const query = req.query.q;

  const news = await newsService.searchNews(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      news,
      "Search results fetched successfully"
    )
  );

});

export {
  getTopHeadlines,
  getCategoryNews,
  searchNews
};