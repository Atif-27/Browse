import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncWrapper from "../utils/asyncWrapper.js";
import ExpressError from "../utils/ExpressError.js";

const authMiddleware = asyncWrapper(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw new ExpressError(401, "Unauthorized access");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ExpressError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ExpressError(401, error?.message || "Unauthorized access");
  }
});
export default authMiddleware;
