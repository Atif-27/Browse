import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getCurrentPlaylist,
  createUserPlaylist,
  getPlaylistById,
  addVideoToPlaylist,
  updatePlaylistById,
  deletePlaylistById,
  removeVideoFromPlaylist,
} from "../controllers/playlist.controller.js";
const router = Router();

router.use(authMiddleware);
// ! Create Playlist
router.route("/").post(createUserPlaylist);
// ! All Playlist of a User
router.route("/user/:userId").get(getCurrentPlaylist);
// ! Get Playlist By Id + Update Playlist + Delete Playlist
router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylistById)
  .delete(deletePlaylistById);

// ! Add Video to Playlist + Remove Video from Playlist
router
  .route("/video/:playlistId")
  .post(addVideoToPlaylist)
  .delete(removeVideoFromPlaylist);

export default router;
