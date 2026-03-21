import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
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

    publishedAt: {
      type: Date
    }

  },
  { timestamps: true }
);

//////////////////////////////////////////////////////
// INDEXES
//////////////////////////////////////////////////////

bookmarkSchema.index({ user: 1, articleId: 1 }, { unique: true });
bookmarkSchema.index({ user: 1, createdAt: -1 });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);