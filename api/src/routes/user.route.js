import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getUserChannel,
  getUserInfo,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateCoverImage,
  updatePassword,
  updateUserAvatar,
  updateUserInfo,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

/*
ROUTE: POST /api/users/login
*/
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

/*
ROUTE: POST /api/users/login
*/
router.route("/login").post(loginUser);

/*
PROTECTED
ROUTE: POST /api/users/logout
*/
router.route("/logout").post(authMiddleware, logoutUser);

/*
ROUTE: POST /api/users/refresh-token
*/
router.route("/refresh-token").post(refreshAccessToken);
/*
PROTECTED
ROUTE: POST /api/users/update-password
*/
router.route("/update-password").post(authMiddleware, updatePassword);
export default router;

/*
PROTECTED
ROUTE: GET /api/users/user
*/
router
  .route("/")
  .get(authMiddleware, getUserInfo)
  .patch(authMiddleware, updateUserInfo);

/*
PROTECTED
ROUTE: GET /api/users/user-avatar
*/
router
  .route("/user-avatar")
  .patch(authMiddleware, upload.single("avatar"), updateUserAvatar);
/*
PROTECTED
ROUTE: GET /api/users/user-cover
*/
router
  .route("/user-cover")
  .patch(authMiddleware, upload.single("coverImage"), updateCoverImage);

router.route("/channel/:username").get(getUserChannel);

router.route("/watch-history").get(authMiddleware, getWatchHistory);
