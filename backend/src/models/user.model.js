import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
      required:true
    },

    country: {
      type: String,
      default: "in"
    },

    interests: [
      {
        type: String,
        enum: [
          "technology",
          "business",
          "sports",
          "science",
          "health",
          "entertainment",
          "politics"
        ]
      }
    ],

    refreshTokens: [
      {
        tokenHash: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        expiresAt: {
          type: Date,
          required: true
        }
      }
    ],
    
    passwordChangedAt: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);




//////////////////////////////////////////////////////
// PASSWORD HASH
//////////////////////////////////////////////////////

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();

});

//////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////

userSchema.methods.isPasswordCorrect = async function (password) {

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {

  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

};

userSchema.methods.generateRefreshToken = function () {

  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

};

userSchema.methods.hashToken = function (token) {

  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

};

//////////////////////////////////////////////////////
// REMOVE SENSITIVE FIELDS
//////////////////////////////////////////////////////

userSchema.methods.toJSON = function () {

  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshTokens;

  return obj;

};

export const User = mongoose.model("User", userSchema);