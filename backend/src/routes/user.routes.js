import { Router } from "express";
import {
  getCurrentUser,
  updateProfile,
  updateInterests
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateInterestsSchema, updateProfileSchema } from "../validators/user.validator.js";
const router = Router();

router.get("/me", verifyJWT, getCurrentUser);

router.patch("/profile", verifyJWT, validate(updateProfileSchema), updateProfile);

router.patch("/interests", verifyJWT, validate(updateInterestsSchema), updateInterests);

export default router;
