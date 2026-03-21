import { History } from "../models/history.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { buildPaginationMeta } from "../utils/paginationMeta.js";
import { trendingService } from "./trending.service.js";

export const historyService = {

//////////////////////////////////////////////////////////
// ADD HISTORY
//////////////////////////////////////////////////////////

async addHistory(userId, article) {

  if (!article?.articleId) {
    throw new ApiError(400, "Invalid article");
  }

  const history = await History.findOneAndUpdate(
    { user: userId, articleId: article.articleId },
    {
      $set: {
        title: article.title,
        image: article.image,
        url: article.url,
        source: article.source,
        readAt: new Date()
      }
    },
    { new: true, upsert: true }
  );

  // 🔥 limit history (50 max) optimized
  const total = await History.countDocuments({ user: userId });

  if (total > 50) {
    const excess = total - 50;

    const oldItems = await History.find({ user: userId })
      .sort({ readAt: 1 })
      .limit(excess)
      .select("_id");

    await History.deleteMany({
      _id: { $in: oldItems.map(i => i._id) }
    });
  }

  // 🔥 async trending
  trendingService.recordView({
    articleId: article.articleId,
    title: article.title,
    image: article.image,
    url: article.url,
    source: article.source
  }).catch(() => {});

  return history;
},

//////////////////////////////////////////////////////////
// GET HISTORY
//////////////////////////////////////////////////////////

async getHistory(userId, query) {

  const { page, limit, skip } = getPagination(query);

  const [data, total] = await Promise.all([
    History.find({ user: userId })
      .sort({ readAt: -1 })
      .skip(skip)
      .limit(limit),

    History.countDocuments({ user: userId })
  ]);

  return {
    data,
    meta: buildPaginationMeta(total, page, limit)
  };
},

//////////////////////////////////////////////////////////
// CLEAR HISTORY
//////////////////////////////////////////////////////////

async clearHistory(userId) {

  await History.deleteMany({ user: userId });

  return true;
}

};