import { Router } from "express";
import { getTrending } from "../controllers/trending.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paginationQuerySchema } from "../validators/common.validator.js";

const router = Router();

router.get("/", validate(paginationQuerySchema), getTrending);

export default router;