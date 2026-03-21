import cron from "node-cron";
import logger from "../utils/logger.js";
import { trendingService } from "../services/trending.service.js";

export const startNewsCron = () => {

  // Runs every 10 minutes
  cron.schedule("*/10 * * * *", async () => {

    try {

      logger.info("Running trending refresh cron job");

      if (trendingService?.refreshTrending) {
        await trendingService.refreshTrending();
      }

    } catch (error) {

      logger.error("Trending cron failed", error);

    }

  });

};