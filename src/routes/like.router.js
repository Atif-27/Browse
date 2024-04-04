import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);
router.route("/:id").post(toggleLike);
export default router;
