import { Router } from "express";
import {
 getNotifications,
 markNotificationRead,
 clearNotifications
} from "../controllers/notification.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paginationQuerySchema, mongoIdParamSchema } from "../validators/common.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyJWT, validate(paginationQuerySchema), getNotifications);

router.patch("/:id/read", verifyJWT, validate(mongoIdParamSchema), markNotificationRead);

router.delete("/", verifyJWT, clearNotifications);

export default router;
