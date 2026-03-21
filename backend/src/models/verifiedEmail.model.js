import mongoose from "mongoose";

const verifiedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 10 * 60 * 1000,
  },
});

verifiedEmailSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const VerifiedEmail = mongoose.model(
  "VerifiedEmail",
  verifiedEmailSchema
);