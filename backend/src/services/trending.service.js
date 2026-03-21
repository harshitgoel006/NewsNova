import { Trending } from "../models/trending.model.js";

export const trendingService = {

//////////////////////////////////////////////////////////
// CALCULATE SCORE (WITH TIME DECAY 🔥)
//////////////////////////////////////////////////////////

calculateScore(trending) {

  const hours =
    (Date.now() - new Date(trending.updatedAt)) / (1000 * 60 * 60);

  const score =
    trending.views * 2 +
    trending.bookmarks * 4;

  // 🔥 decay
  return score / (1 + hours * 0.1);
},

//////////////////////////////////////////////////////////
// RECORD VIEW
//////////////////////////////////////////////////////////

async recordView(article){

  const trending = await Trending.findOneAndUpdate(
    { articleId: article.articleId },
    {
      $inc: { views: 1 },
      $setOnInsert: {
        title: article.title,
        image: article.image,
        url: article.url,
        source: article.source
      }
    },
    { upsert: true, new: true }
  );

  trending.score = this.calculateScore(trending);
  await trending.save();
},

//////////////////////////////////////////////////////////
// RECORD BOOKMARK
//////////////////////////////////////////////////////////

async recordBookmark(article){

  const trending = await Trending.findOneAndUpdate(
    { articleId: article.articleId },
    {
      $inc: { bookmarks: 1 },
      $setOnInsert: {
        title: article.title,
        image: article.image,
        url: article.url,
        source: article.source
      }
    },
    { upsert: true, new: true }
  );

  trending.score = this.calculateScore(trending);
  await trending.save();
},

//////////////////////////////////////////////////////////
// GET TRENDING
//////////////////////////////////////////////////////////

async getTrending(limit = 10){

  return await Trending.find()
    .sort({ score: -1 })
    .limit(Number(limit));
}

};