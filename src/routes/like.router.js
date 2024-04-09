import { Router } from "express";
import {
  getAllLikedVideos,
  toggleLike,
} from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);
router.route("/:id").post(toggleLike);
router.route("/").get(getAllLikedVideos);
export default router;
