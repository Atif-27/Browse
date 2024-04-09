import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import Video from "../models/video.model.js";
import Comment from "../models/comments.model.js";
import Like from "../models/like.model.js";
import mongoose from "mongoose";
// * Toggle Like
const toggleLike = asyncWrapper(async (req, res) => {
  const likeable = req.params?.id;
  const likedBy = req.user?._id;
  const { onModel } = req.body;
  if (!onModel) {
    throw new ExpressError(400, "onModel is required");
  }
  const likeExists = await Like.findOne({
    $and: [{ likedBy }, { likeable }, { onModel }],
  });
  if (!likeExists) {
    if (onModel === "Video") {
      const videoExists = await Video.findById(likeable);
      if (!videoExists) {
        throw new ExpressError(404, "Video not found");
      }
    }
    if (onModel === "Comment") {
      const commentExists = await Comment.findById(likeable);
      if (!commentExists) {
        throw new ExpressError(404, "Comment not found");
      }
    }
    const newLike = await Like.create({ likedBy, likeable, onModel });
    return res
      .status(201)
      .json(new ExpressResponse(201, newLike, "Liked successfully"));
  } else {
    await Like.findByIdAndDelete(likeExists._id);
    return res
      .status(200)
      .json(new ExpressResponse(200, [], "Unliked successfully"));
  }
});
// * Get Liked Videos
const getAllLikedVideos = asyncWrapper(async (req, res) => {
  const likedBy = req.user?._id;
  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(likedBy),
        onModel: "Video",
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "likeable",
        foreignField: "_id",
        as: "video",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                    _id: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$owner",
            },
          },
          {
            $project: {
              title: 1,
              description: 1,
              thumbnail: 1,
              createdAt: 1,
              updatedAt: 1,
              owner: 1,
              views: 1,
              duration: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        video: 1,
      },
    },
  ]);
  res
    .status(200)
    .json(new ExpressResponse(200, likedVideos[0], "Liked videos"));
});

export { toggleLike, getAllLikedVideos };
