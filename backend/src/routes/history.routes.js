import { Router } from "express";
import {
  addHistory,
  getHistory,
  clearHistory
} from "../controllers/history.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { historySchema} from "../validators/history.validator.js";
import { paginationQuerySchema } from "../validators/common.validator.js";
const router = Router();

router.post("/", verifyJWT, validate(historySchema), addHistory);

router.get("/", verifyJWT, validate(paginationQuerySchema), getHistory);

router.delete("/", verifyJWT, clearHistory);

export default router;
