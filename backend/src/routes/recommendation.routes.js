import { Router } from "express";
import { getRecommendations } from "../controllers/recommendation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paginationQuerySchema } from "../validators/common.validator.js";

const router = Router();

router.get("/", verifyJWT, validate(paginationQuerySchema), getRecommendations);

export default router;
