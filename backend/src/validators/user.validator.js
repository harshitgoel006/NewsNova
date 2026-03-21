import { z } from "zod";

//////////////////////////////////////////////////////////
// COMMON
//////////////////////////////////////////////////////////

const fullname = z
  .string()
  .min(3, "Full name must be at least 3 characters")
  .max(50, "Full name too long")
  .trim();

const country = z
  .string()
  .length(2, "Country must be ISO code (2 letters)")
  .transform(val => val.toLowerCase());

const interests = z
  .array(
    z.enum([
      "technology",
      "business",
      "sports",
      "science",
      "health",
      "entertainment",
      "politics"
    ])
  )
  .min(1, "Select at least one interest")
  .max(10, "Too many interests selected");

//////////////////////////////////////////////////////////
// UPDATE PROFILE
//////////////////////////////////////////////////////////

export const updateProfileSchema = z.object({
  fullname: fullname.optional(),
  country: country.optional()
}).refine(
  data => data.fullname || data.country,
  {
    message: "At least one field is required",
  }
);

//////////////////////////////////////////////////////////
// UPDATE INTERESTS
//////////////////////////////////////////////////////////

export const updateInterestsSchema = z.object({
  interests
});