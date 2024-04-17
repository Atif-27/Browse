import Comment from "../models/comments.model.js";
import Video from "../models/video.model.js";
import Like from "../models/like.model.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import correctUser from "../utils/correctUser.js";
import mongoose from "mongoose";

// * Get comments by video ID
const getAllCommentsByVideoId = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  // const comments = await Comment.find({ video: videoId });
  const commentsAggregate = Comment.aggregate([
    { $match: { video: new mongoose.Types.ObjectId(videoId) } },
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
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likeable",
        as: "likes",
      },
    },
    {
      $addFields: {
        likeCount: { $size: "$likes" },
        isLiked: { $in: [req.user?._id, "$likes.likedBy"] },
        owner: { $first: "$owner" },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        content: 1,
        owner: 1,
        likeCount: 1,
        isLiked: 1,

        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
  const comments = await Comment.aggregatePaginate(commentsAggregate, options);
  console.log(comments.docs.length);
  res.status(200).json(new ExpressResponse(200, comments, "Comments found"));
});

// * Add comment to video
const addCommentToVideo = asyncWrapper(async (req, res) => {
  const owner = req.user._id;
  const { videoId } = req.params;
  const { content } = req.body;
  const video = await Video.findById(videoId);
  if (!video) throw new ExpressError(404, "Video not found");
  if (!content) throw new ExpressError(400, "Content is required");
  const data = await Comment.create({ owner, content, video: videoId });
  const newComment = await Comment.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(data._id) },
    },
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
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likeable",
        as: "likes",
      },
    },
    {
      $addFields: {
        likeCount: { $size: "$likes" },
        isLiked: { $in: [req.user?._id, "$likes.likedBy"] },
        owner: { $first: "$owner" },
      },
    },

    {
      $project: {
        content: 1,
        owner: 1,
        likeCount: 1,
        isLiked: 1,

        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
  console.log(newComment);
  res
    .status(201)
    .json(
      new ExpressResponse(201, newComment[0], "Comment added successfully")
    );
});

// * Get Comment By ID
const getCommentsById = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ExpressError(404, "Comment not found");
  res
    .status(200)
    .json(new ExpressResponse(200, comment, "Comment found successfully"));
});
// * Update a comment by ID
const updateCommentById = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ExpressError(404, "Comment not found");
  if (!correctUser(req.user._id, comment.owner))
    throw new ExpressError(403, "You are not allowed to update this comment");
  if (!content) throw new ExpressError(400, "Content is required");
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      content,
    },
    { new: true }
  );
  if (!updatedComment) throw new ExpressError(500, "Failed to update comment");
  res
    .status(200)
    .json(
      new ExpressResponse(200, updatedComment, "Comment updated successfully")
    );
});
// * Delete comment by ID
const deleteCommentById = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ExpressError(404, "Comment not found");
  if (!correctUser(req.user?._id, comment.owner))
    throw new ExpressError(403, "You are not allowed to delete this comment");
  await Comment.findByIdAndDelete(commentId);
  await Like.deleteMany({
    likeable: commentId,
  });
  res.status(200).json(new ExpressResponse(200, {}, "Comment deleted"));
});
export {
  addCommentToVideo,
  getAllCommentsByVideoId,
  getCommentsById,
  updateCommentById,
  deleteCommentById,
};
