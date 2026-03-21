import { z } from "zod";

//////////////////////////////////////////////////////////
// COMMON
//////////////////////////////////////////////////////////

const email = z
  .string()
  .email("Invalid email address")
  .transform(val => val.toLowerCase().trim());

const password = z
  .string()
  .min(6, "Password must be at least 6 characters");

//////////////////////////////////////////////////////////
// AUTH
//////////////////////////////////////////////////////////

export const signupSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .trim(),

  email,

  password,

  country: z
    .string()
    .length(2, "Country must be ISO code")
    .optional(),

  interests: z
    .array(z.string())
    .min(1, "Select at least one interest")
    .optional()
});

export const loginSchema = z.object({
  email,
  password
});

//////////////////////////////////////////////////////////
// OTP
//////////////////////////////////////////////////////////

export const sendOtpSchema = z.object({
  email
});

export const verifyOtpSchema = z.object({
  email,
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
});

//////////////////////////////////////////////////////////
// FORGOT PASSWORD
//////////////////////////////////////////////////////////

export const sendResetOtpSchema = z.object({
  email
});

export const verifyResetOtpSchema = z.object({
  email,
  otp: z.string().length(6)
});

export const resetPasswordSchema = z.object({
  email,
  otp: z.string().length(6),
  newPassword: password
});

//////////////////////////////////////////////////////////
// CHANGE PASSWORD (LOGGED IN)
//////////////////////////////////////////////////////////

export const changePasswordSchema = z.object({
  oldPassword: password,
  newPassword: password
});