import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true
  },

  message: {
    type: String
  },
  

  articleId: {
    type: String
  },

  type: {
    type: String,
    enum: [
      "breaking_news",
      "recommendation",
      "trending",
      "system"
    ],
    default: "system"
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

notificationSchema.index({ user: 1, createdAt: -1 });

export const Notification =
  mongoose.model("Notification", notificationSchema);