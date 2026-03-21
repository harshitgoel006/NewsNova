import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { bookmarkService } from "../services/bookmark.service.js";

//////////////////////////////////////////////////////////
// ADD BOOKMARK
//////////////////////////////////////////////////////////

const addBookmark = asyncHandler(async (req, res) => {

  const bookmark = await bookmarkService.addBookmark(
    req.user._id,
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      bookmark,
      "Bookmark added successfully"
    )
  );

});

//////////////////////////////////////////////////////////
// GET BOOKMARKS
//////////////////////////////////////////////////////////

const getBookmarks = asyncHandler(async (req, res) => {

  const bookmarks = await bookmarkService.getBookmarks(req.user._id,req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      bookmarks,
      "Bookmarks fetched successfully"
    )
  );

});

//////////////////////////////////////////////////////////
// REMOVE BOOKMARK
//////////////////////////////////////////////////////////

const removeBookmark = asyncHandler(async (req, res) => {

  const bookmark = await bookmarkService.removeBookmark(
    req.user._id,
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      bookmark,
      "Bookmark removed successfully"
    )
  );

});


export {
  addBookmark,
  getBookmarks,
  removeBookmark
};