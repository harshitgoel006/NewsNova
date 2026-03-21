import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { historyService } from "../services/history.service.js";

//////////////////////////////////////////////////////////
// ADD HISTORY
//////////////////////////////////////////////////////////

const addHistory = asyncHandler(async (req, res) => {

  const history = await historyService.addHistory(
    req.user._id,
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      history,
      "Article added to history"
    )
  );

});


//////////////////////////////////////////////////////////
// GET HISTORY
//////////////////////////////////////////////////////////

const getHistory = asyncHandler(async (req, res) => {

  const history = await historyService.getHistory(req.user._id , req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      history,
      "History fetched successfully"
    )
  );

});

//////////////////////////////////////////////////////////
// CLEAR HISTORY
//////////////////////////////////////////////////////////

const clearHistory = asyncHandler(async (req, res) => {

  await historyService.clearHistory(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "History cleared successfully"
    )
  );

});

export {
  addHistory,
  getHistory,
  clearHistory
};