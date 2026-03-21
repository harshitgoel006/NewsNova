import { redisClient } from "../config/redis.js";

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null; // fail safe
  }
};

export const setCache = async (key, value, ttl = 300) => {
  try {
    await redisClient.setEx(
      key,
      ttl,
      JSON.stringify(value)
    );
  } catch (err) {
  }
};