import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { getCache, setCache } from "../utils/cache.js";

const NEWS_BASE_URL = "https://gnews.io/api/v4";

export const newsService = {

//////////////////////////////////////////////////////////
// TOP HEADLINES
//////////////////////////////////////////////////////////

async getTopHeadlines(country = "in") {

  const cacheKey = `headlines:${country}`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  try {

    if (!process.env.NEWS_API_KEY) {
      throw new ApiError(500, "NEWS_API_KEY missing in .env");
    }

    const { data } = await axios.get(
      `${NEWS_BASE_URL}/top-headlines`,
      {
        params: {
          country,
          lang:"en",
          token: process.env.NEWS_API_KEY
        },
        timeout: 5000
      }
    );

    const articles = data.articles || [];

    await setCache(cacheKey, articles, 300);

    return articles;

  } catch (err) {

    console.error("GNews Error:", err.response?.data || err.message);

    throw new ApiError(
      500,
      err.response?.data?.message || "Failed to fetch headlines"
    );
  }
},

//////////////////////////////////////////////////////////
// CATEGORY NEWS
//////////////////////////////////////////////////////////

async getCategoryNews(category, country = "in") {

  const cacheKey = `category:${category}:${country}`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  try {

    const { data } = await axios.get(
      `${NEWS_BASE_URL}/top-headlines`,
      {
        params: {
          topic: category,
          lang: "en",
          country,
          token: process.env.NEWS_API_KEY
        },
        timeout: 5000
      }
    );

    const articles = data.articles || [];

    await setCache(cacheKey, articles, 300);

    return articles;

  } catch (err) {

    console.error("Category Error:", err.response?.data || err.message);

    throw new ApiError(
      500,
      err.response?.data?.message || "Failed to fetch category news"
    );
  }
},

//////////////////////////////////////////////////////////
// SEARCH NEWS
//////////////////////////////////////////////////////////

async searchNews(query) {

  const cacheKey = `search:${query}`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  try {

    const { data } = await axios.get(
      `${NEWS_BASE_URL}/search`,
      {
        params: {
          q: query,
          lang:"en",
          token: process.env.NEWS_API_KEY
        },
        timeout: 5000
      }
    );

    const articles = data.articles || [];

    await setCache(cacheKey, articles, 120);

    return articles;

  } catch (err) {

    console.error("Search Error:", err.response?.data || err.message);

    throw new ApiError(
      500,
      err.response?.data?.message || "Search failed"
    );
  }
}

};