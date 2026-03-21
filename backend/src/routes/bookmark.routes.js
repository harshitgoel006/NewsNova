import { Router } from "express";
import {
  addBookmark,
  getBookmarks,
  removeBookmark
} from "../controllers/bookmark.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { bookmarkSchema } from "../validators/bookmark.validator.js";
import { paginationQuerySchema, mongoIdParamSchema } from "../validators/common.validator.js";


const router = Router();

router.post("/", verifyJWT, validate(bookmarkSchema), addBookmark);

router.get("/", verifyJWT, validate(paginationQuerySchema), getBookmarks);

router.delete("/:id", verifyJWT, validate(mongoIdParamSchema), removeBookmark);

export default router;
