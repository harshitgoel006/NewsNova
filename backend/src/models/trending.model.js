import mongoose from "mongoose";

const trendingSchema = new mongoose.Schema({

  articleId: {
    type: String,
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true
  },

  image: String,

  url: {
    type: String,
    required: true
  },

  source: String,
  

  views: {
    type: Number,
    default: 0
  },

  bookmarks: {
    type: Number,
    default: 0
  },

  score: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

trendingSchema.index({ score: -1 });

export const Trending = mongoose.model("Trending", trendingSchema);