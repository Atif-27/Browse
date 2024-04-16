import asyncWrapper from "../utils/asyncWrapper.js";
import Playlist from "../models/playlist.model.js";
import Video from "../models/video.model.js";
import correctUser from "../utils/correctUser.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import mongoose from "mongoose";

// * Get All Playlist of User
const getCurrentPlaylist = asyncWrapper(async (req, res) => {
  const { userId } = req.params;

  const playlists = await Playlist.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },

    {
      $addFields: {
        totalVideos: { $size: "$videos" },
        totalViews: { $sum: "$videos.views" },
        thumbnail: {
          $first: "$videos.thumbnail",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        totalVideos: 1,
        totalViews: 1,
        updatedAt: 1,
        createdAt: 1,
        thumbnail: 1,
      },
    },
  ]);
  res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        playlists,
        "Your Playlist retrieved successfully"
      )
    );
});

// * Create A Playlist
const createUserPlaylist = asyncWrapper(async (req, res) => {
  const owner = req.user?._id;
  const { name, description } = req.body;
  if (!name) {
    throw new ExpressError(400, "Playlist Name is required");
  }
  const playlist = await Playlist.create({ name, description, owner });
  if (!playlist) throw new ExpressError(500, "Failed to create playlist");
  res
    .status(201)
    .json(new ExpressResponse(201, playlist, "Playlist created successfully"));
});

// * Get Playlist By Id
const getPlaylistById = asyncWrapper(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(playlistId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
        pipeline: [
          {
            $match: {
              isPublished: true,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
            },
          },
          {
            $unwind: "$owner",
          },
        ],
      },
    },

    {
      $addFields: {
        totalVideos: { $size: "$videos" },
        totalViews: { $sum: "$videos.views" },
        owner: { $first: "$owner" },
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
        totalVideos: 1,
        totalViews: 1,
        videos: {
          _id: 1,
          thumbnail: 1,
          isPublished: 1,
          title: 1,
          description: 1,
          duration: 1,
          createdAt: 1,
          views: 1,
          owner: {
            _id: 1,

            username: 1,
            fullName: 1,
            avatar: 1,
          },
        },
        owner: {
          _id: 1,
          username: 1,
          fullName: 1,
          avatar: 1,
        },
      },
    },
  ]);
  if (!playlist) {
    throw new ExpressError(404, "Playlist not found");
  }
  res
    .status(200)
    .json(
      new ExpressResponse(200, playlist[0], "Playlist retrieved successfully")
    );
});

// * Update Playlist By Id
const updatePlaylistById = asyncWrapper(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ExpressError(404, "Playlist not found");
  if (!correctUser(req.user._id, playlist.owner))
    throw new ExpressError(
      401,
      "You are not authorized to update this playlist"
    );
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { name, description },
    { new: true }
  );
  if (!updatedPlaylist)
    throw new ExpressError(500, "Failed to update playlist");
  res
    .status(200)
    .json(
      new ExpressResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});
// * Delete Playlist By Id
const deletePlaylistById = asyncWrapper(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ExpressError(404, "Playlist not found");
  if (!correctUser(req.user._id, playlist.owner))
    throw new ExpressError(
      401,
      "You are not authorized to delete this playlist"
    );
  await Playlist.findByIdAndDelete(playlistId);
  res
    .status(200)
    .json(new ExpressResponse(200, {}, "Playlist deleted successfully"));
});
// * Add Video to Playlist
const addVideoToPlaylist = asyncWrapper(async (req, res) => {
  const { playlistId } = req.params;
  const { videoId } = req.body;
  const playlist = await Playlist.findById(playlistId);
  const video = await Video.findById(videoId);
  if (!playlist) throw new ExpressError(404, "Playlist not found");
  if (!video) throw new ExpressError(404, "Video not found");
  if (!correctUser(req.user._id, playlist.owner))
    throw new ExpressError(
      401,
      "You are not authorized to add video to this playlist"
    );
  const newPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $push: { videos: videoId } },
    { new: true }
  );
  res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        newPlaylist,
        "Video added to Playlist successfully"
      )
    );
});

// * Remove Video from Playlist
const removeVideoFromPlaylist = asyncWrapper(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  const { videoId } = req.body;

  const video = await Video.findById(videoId);
  if (!playlist) throw new ExpressError(404, "Playlist not found");
  if (!video) throw new ExpressError(404, "Video not found");
  if (!correctUser(req.user._id, playlist.owner))
    throw new ExpressError(
      401,
      "You are not authorized to add video to this playlist"
    );
  const newPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: videoId } }, //! BUT DELETES ALL VIDEO CHECK
    { new: true }
  );
  res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        newPlaylist,
        "Video removed from Playlist successfully"
      )
    );
});

export {
  getCurrentPlaylist,
  createUserPlaylist,
  getPlaylistById,
  deletePlaylistById,
  updatePlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
