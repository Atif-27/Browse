import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteVideoById,
  getAllVideos,
  toggleIsPublished,
  updateVideoById,
  uploadVideo,
} from "../controllers/video.controller.js";
const router = Router();

router.use(authMiddleware);
router
  .route("/")
  .get()
  .post(
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    uploadVideo
  );
router
  .route("/:videoId")
  .patch(upload.single("thumbnail"), updateVideoById)
  .delete(deleteVideoById);
router.get("/", getAllVideos);
router.patch("/:videoId/togglePublish", toggleIsPublished);

export default router;
