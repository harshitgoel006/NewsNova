import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    articleId: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    url: {
      type: String,
      required: true
    },

    source: {
      type: String
    },

    readAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

//////////////////////////////////////////////////////
// INDEXES
//////////////////////////////////////////////////////

historySchema.index({ user: 1, readAt: -1 });
historySchema.index({ user: 1, articleId: 1 });

export const History = mongoose.model("History", historySchema);
