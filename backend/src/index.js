import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { connectRedis } from "./config/redis.js";
import logger from "./utils/logger.js";
import { startNewsCron } from "./cron/news.cron.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const startServer = async () => {
  try {
    await connectDB();
    logger.info("MongoDB connected");

    await connectRedis();
    logger.info("Redis connected");

    startNewsCron();
    logger.info("Cron jobs started");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

  } catch (error) {
    logger.error("Startup failed", error);
    process.exit(1); 
  }
};

startServer();