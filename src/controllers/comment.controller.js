import Comment from "../models/comments.model.js";
import Video from "../models/video.model.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import correctUser from "../utils/correctUser.js";

// * Get comments by video ID
const getAllCommentsByVideoId = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  const comments = await Comment.find({ video: videoId });
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
  const newComment = await Comment.create({ owner, content, video: videoId });
  res
    .status(201)
    .json(new ExpressResponse(201, newComment, "Comment added successfully"));
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
  res.status(200).json(new ExpressResponse(200, {}, "Comment deleted"));
});
export {
  addCommentToVideo,
  getAllCommentsByVideoId,
  getCommentsById,
  updateCommentById,
  deleteCommentById,
};
