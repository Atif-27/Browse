import { Router } from "express";
import {
  addCommentToVideo,
  deleteCommentById,
  getAllCommentsByVideoId,
  getCommentsById,
  updateCommentById,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.use(authMiddleware);

router
  .route("/video/:videoId")
  .get(getAllCommentsByVideoId)
  .post(addCommentToVideo);
router
  .route("/:commentId")
  .get(getCommentsById)
  .patch(updateCommentById)
  .delete(deleteCommentById);

export default router;
