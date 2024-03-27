import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
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
PROTECTED
ROUTE: POST /api/users/logout
*/
router.route("/refresh-token").post(refreshAccessToken);
export default router;
