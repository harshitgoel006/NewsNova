import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware.js";
import { apiLimiter } from "./middlewares/rate.middleware.js";

// Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import bookmarkRouter from "./routes/bookmark.routes.js";
import historyRouter from "./routes/history.routes.js";
import newsRouter from "./routes/news.routes.js";
import trendingRouter from "./routes/trending.routes.js";
import recommendationRouter from "./routes/recommendation.routes.js";
import notificationRouter from "./routes/notification.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use("/api", apiLimiter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/trending", trendingRouter);
app.use("/api/v1/recommendations", recommendationRouter);
app.use("/api/v1/notifications", notificationRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



app.use(errorHandler);

export { app };