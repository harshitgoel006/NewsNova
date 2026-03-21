import { Bookmark } from "../models/bookmark.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { buildPaginationMeta } from "../utils/paginationMeta.js";
import { trendingService } from "./trending.service.js";

export const bookmarkService = {

//////////////////////////////////////////////////////////
// ADD BOOKMARK
//////////////////////////////////////////////////////////

async addBookmark(userId, article) {

  if (!article?.articleId) {
    throw new ApiError(400, "Invalid article data");
  }

  try {
    const bookmark = await Bookmark.create({
      user: userId,
      articleId: article.articleId,
      title: article.title,
      image: article.image,
      url: article.url,
      source: article.source,
      publishedAt: article.publishedAt
    });

    // 🔥 async fire (non-blocking)
    trendingService.recordBookmark({
      articleId: article.articleId,
      title: article.title,
      image: article.image,
      url: article.url,
      source: article.source
    }).catch(() => {});

    return bookmark;

  } catch (err) {

    // 🔥 handle duplicate error
    if (err.code === 11000) {
      throw new ApiError(400, "Article already bookmarked");
    }

    throw err;
  }
},

//////////////////////////////////////////////////////////
// GET BOOKMARKS
//////////////////////////////////////////////////////////

async getBookmarks(userId, query) {

  const { page, limit, skip } = getPagination(query);

  const [bookmarks, total] = await Promise.all([
    Bookmark.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Bookmark.countDocuments({ user: userId })
  ]);

  return {
    data: bookmarks,
    meta: buildPaginationMeta(total, page, limit)
  };
},

//////////////////////////////////////////////////////////
// REMOVE BOOKMARK
//////////////////////////////////////////////////////////

async removeBookmark(userId, bookmarkId) {

  const bookmark = await Bookmark.findOneAndDelete({
    _id: bookmarkId,
    user: userId
  });

  if (!bookmark) {
    throw new ApiError(404, "Bookmark not found");
  }

  return bookmark;
}

};