import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getSubscribedTo,
  getSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";

const router = Router();
router.use(authMiddleware);

router.route("/:channelId").post(toggleSubscription);
router.route("/subscribedTo").get(getSubscribedTo);
router.route("/subscribers").get(getSubscribers);

export default router;
