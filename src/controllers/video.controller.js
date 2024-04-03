import asyncWrapper from "../utils/asyncWrapper.js";
import Video from "../models/video.model.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import { deleteFile, uploadFile } from "../utils/cloudinary.js";
import deleteLocal from "../utils/deleteLocal.js";
import correctUser from "../utils/correctUser.js";

// * Upload Video
const uploadVideo = asyncWrapper(async (req, res) => {
  const { title, description } = req.body;
  const video = Array.isArray(req.files?.video) ? req.files.video[0].path : "";
  const thumbnail = Array.isArray(req.files?.thumbnail)
    ? req.files.thumbnail[0].path
    : "";
  if (!video || !thumbnail)
    throw new ExpressError(400, "Please upload video and thumbnail");
  const videoLink = await uploadFile(video);
  const thumbnailLink = await uploadFile(thumbnail);
  if (!videoLink || !thumbnailLink)
    throw new ExpressError(500, "Failed to upload video or thumbnail");

  const newVideo = new Video({
    title,
    description,
    video,
    owner: req.user._id,
    videoFile: videoLink.url,
    thumbnail: thumbnailLink.url,
    duration: videoLink.duration,
  });
  await newVideo.save();
  res.status(201).json(new ExpressResponse(201, newVideo, "Video uploaded"));
});

// * Get video by ID
const getVideoById = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) throw new ExpressError(400, "Video not found");
  res.status(200).json(new ExpressResponse(200, video, "Video found"));
});
// * Update video by ID
const updateVideoById = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const videoInfo = await Video.findById(videoId);
  const thumbnail = req.file?.path;
  if (!videoInfo) throw new ExpressError(400, "Video not found");
  if (!correctUser(req.user?._id, videoInfo.owner)) {
    deleteLocal(thumbnail);
    throw new ExpressError(403, "You are not allowed to update this video");
  }

  if (!title || !description)
    throw new ExpressError(400, "Title and description are required");
  if (!thumbnail) throw new ExpressError(400, "Please upload thumbnail");
  const thumbnailLink = await uploadFile(thumbnail);
  if (!thumbnailLink) throw new ExpressError(500, "Failed to upload thumbnail");
  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      title,
      description,
      thumbnail: thumbnailLink.url,
    },
    { new: true }
  );
  res.status(200).json(new ExpressResponse(200, video, "Video updated"));
});

// * Delete Video by ID
const deleteVideoById = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) throw new ExpressError(400, "Video not found");
  if (!correctUser(req.user?._id, video.owner))
    throw new ExpressError(403, "You are not allowed to delete this video");

  await Video.findByIdAndDelete(videoId);
  //   console.log(video.videoFile, video.thumbnail);
  await deleteFile(video.videoFile, "video");
  await deleteFile(video.thumbnail, "image");
  res.status(200).json(new ExpressResponse(200, {}, "Video deleted"));
});

// * Toggle isPublished Status
const toggleIsPublished = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) throw new ExpressError(400, "Video not found");
  if (!correctUser(req.user?._id, video.owner))
    throw new ExpressError(403, "You are not allowed to update this video");
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    { isPublished: !video.isPublished },
    { new: true }
  );
  res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        updatedVideo,
        `Video is now ${updatedVideo.isPublished ? "published" : "unpublished"}`
      )
    );
});
export {
  uploadVideo,
  getVideoById,
  updateVideoById,
  deleteVideoById,
  toggleIsPublished,
};
