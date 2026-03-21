import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export const connectRedis = async () => {
  try {
    if (process.env.REDIS_ENABLED !== "true") {
      console.log("Redis disabled");
      return;
    }

    await redisClient.connect();
    console.log("Redis connected");
  } catch (err) {
    console.log("Redis error ignored");
  }
};