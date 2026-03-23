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
  body: z.object({
    fullname: z.string().min(3),
    email,
    password,
    country: z.string().length(2).optional(),
    interests: z.array(z.string()).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email,
    password
  })
});

//////////////////////////////////////////////////////////
// OTP
//////////////////////////////////////////////////////////

export const sendOtpSchema = z.object({
  body: z.object({
    email
  })
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email,
    otp: z.string().length(6)
  })
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