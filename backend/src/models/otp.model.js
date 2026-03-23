import mongoose from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otpHash: {
      type: String,
      required: true,
      select: false,
    },

    purpose: {
      type: String,
      enum: ["verify_email", "reset_password"],
      required: true,
      index: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      default: () => Date.now() + 5 * 60 * 1000,
    },
  },
  { timestamps: true }
);

// TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Hash OTP
otpSchema.pre("save", async function () {
  if (!this.isModified("otpHash")) return;
  this.otpHash = await bcrypt.hash(this.otpHash, 10);
});

// Verify OTP
otpSchema.methods.verifyOTP = function (otp) {
  return bcrypt.compare(otp, this.otpHash);
};

export const OTP = mongoose.model("OTP", otpSchema);