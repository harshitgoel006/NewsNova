import { User } from "../models/user.model.js";
import { History } from "../models/history.model.js";
import { Bookmark } from "../models/bookmark.model.js";
import { Trending } from "../models/trending.model.js";

export const recommendationService = {

async getRecommendations(userId){

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const interests = user.interests || [];

  const [trending, history, bookmarks] = await Promise.all([

    Trending.find()
      .sort({ score: -1 })
      .limit(20),

    History.find({ user: userId })
      .sort({ readAt: -1 })
      .limit(10),

    Bookmark.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10)

  ]);

  // 🔥 score map
  const map = new Map();

  const add = (article, weight) => {
    if (!article?.articleId) return;

    const key = article.articleId;

    if (!map.has(key)) {
      map.set(key, { ...article.toObject(), score: 0 });
    }

    map.get(key).score += weight;
  };

  // trending weight
  trending.forEach(a => add(a, 5));

  // history weight
  history.forEach(a => add(a, 3));

  // bookmark weight
  bookmarks.forEach(a => add(a, 4));

  // interest boost
  for (const item of map.values()) {
    if (interests.some(i =>
      item.title?.toLowerCase().includes(i)
    )) {
      item.score += 3;
    }
  }

  return Array.from(map.values())
    .sort((a,b) => b.score - a.score)
    .slice(0, 20);
}

};