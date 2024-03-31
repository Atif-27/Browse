import jwt from "jsonwebtoken";

import asyncWrapper from "../utils/asyncWrapper.js";
import ExpressError from "../utils/ExpressError.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import User from "../models/user.model.js";
import { deleteFile, uploadFile } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// *REGISTER USER
const registerUser = asyncWrapper(async (req, res) => {
  const { username, fullName, email, password } = req.body; //! Extracted Fields from req.body
  // ! Validating Fields from req.body
  if (
    [username, fullName, email, password].some(
      (field) => !field || field.trim() === ""
    )
  )
    throw new ExpressError(400, "Please fill in all fields");

  //! Checking if user with same username or email already exist or not
  const isPresent = await User.findOne({ $or: [{ username }, { email }] });
  if (isPresent) {
    throw new ExpressError(
      400,
      "User with same username or email already exists"
    );
  }
  //! Local Path of file extraction
  const avatarLocalPath = Array.isArray(req.files?.avatar)
    ? req.files?.avatar[0]?.path
    : "";
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  // if (!avatarLocalPath) {
  //   throw new ExpressError(400, "Please upload avatar ");
  // }
  // ! Uploading files to cloudinary
  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath);

  // if (!avatar) {
  //   throw new ExpressError(400, "Error Occured while uploading avatar");
  // }
  // ! Creating new user
  const newUser = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  //! Checking if proper user created or not
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ExpressError(500, "Something went Wrong While registering user");
  }

  return res
    .status(201)
    .json(
      new ExpressResponse(201, createdUser, "User Registered successfully")
    );
});

// *LOGIN USER
const loginUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body; //! Extract Fields from req.body
  // ! Validating Fields
  if (!email && !username) {
    throw new ExpressError(400, "Please provide email or username");
  }
  // ! Checking if user with username/email exist or not
  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (!userExist)
    throw new ExpressError(400, "User not found with this email or username");
  // ! Checking password
  const isPasswordCorrect = await userExist.checkPassword(password);
  if (!isPasswordCorrect)
    throw new ExpressError(400, "Incorrect Password Please try again");

  // ! Generate Access & Refresh Token and store Refresh Token in DB
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    userExist._id
  );

  const user = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  // ! Set Access & Refresh Token in Cookies
  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ExpressResponse(
        200,
        { accessToken, refreshToken, user },
        "User Logged in successfully"
      )
    );
});

// *LOGOUT USER
const logoutUser = asyncWrapper(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };
  await User.findByIdAndUpdate(req.user._id, { refreshToken: undefined });
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ExpressResponse(200, {}, "User Logged out successfully"));
});

// *Refresh Access Token
const refreshAccessToken = asyncWrapper(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  console.log(token);
  if (!token) {
    throw new ExpressError(400, "Refresh Token not found");
  }
  const tokenData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(tokenData._id);
  console.log(user);
  if (!user) {
    throw new ExpressError(400, "Invalid Refresh Token");
  }
  if (user.refreshToken !== token) {
    throw new ExpressError(400, "Refresh Token is expired or used");
  }
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ExpressResponse(
        200,
        { accessToken, refreshToken },
        "Access Token Refreshed Successfully"
      )
    );
});
// * Get User Info
const getUserInfo = asyncWrapper(async (req, res) => {
  const user = req.user;
  res
    .status(200)
    .json(new ExpressResponse(200, user, "User Info Fetched Successfully"));
});
// * Update Current Password
const updatePassword = asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (currentPassword === newPassword)
    throw new ExpressError(
      400,
      "New Password can't be same as Current Password"
    );
  const user = await User.findById(req.user._id);
  const isCorrectPassword = await user.checkPassword(currentPassword);
  if (!isCorrectPassword)
    throw new ExpressError(400, "Incorrect Password Please try again");
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ExpressResponse(200, {}, "Password Updated Successfully"));
});

// * Update User Info
const updateUserInfo = asyncWrapper(async (req, res) => {
  const { username, fullName, email } = req.body;
  if (!username || !fullName || !email)
    throw new ExpressError(400, "Please fill all the fields");
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      username,
      fullName,
      email,
    },
    { new: true }
  ).select("-password -refreshToken");
  res
    .status(200)
    .json(new ExpressResponse(200, user, "User Info Updated Successfully"));
});

// * Update User Avatar
const updateUserAvatar = asyncWrapper(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ExpressError(400, "Please upload avatar");
  const avatar = await uploadFile(avatarLocalPath);
  if (!avatar.url) throw new ExpressError(400, "Error While Uploading Avatar");
  await deleteFile(req.user.avatar);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar.url },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(new ExpressResponse(200, user, "User Avatar Updated Successfully"));
});

// * Update User Cover
const updateCoverImage = asyncWrapper(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath)
    throw new ExpressError(400, "Please upload cover image");
  const coverImage = await uploadFile(coverImageLocalPath);
  if (!coverImage.url)
    throw new ExpressError(400, "Error while uploading cover image");
  await deleteFile(req.user.coverImage);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { coverImage: coverImage.url },
    { new: true }
  ).select("-password -refreshToken");
  res.status(200).json(new ExpressResponse(200, user, "Cover Image Updated"));
});

// * Get User Channel
const getUserChannel = asyncWrapper(async (req, res) => {
  const username = req.params?.username;
  if (!username) throw new ExpressError(400, "Please provide Channel Username");
  const channel = await User.aggregate([
    {
      $match: { username },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subcribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: { $size: "$subscribers" },
        subscribedToCount: { $size: "$subcribedTo" },
        isSubscribed: { $in: [req.user?._id, "$subscribers.subscriber"] },
      },
    },
    {
      $project: {
        username: 1,
        fullName: 1,
        email: 1,
        avatar: 1,
        coverImage: 1,
        subscriberCount: 1,
        subscribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);
  console.log(channel);
  res.status(200).json(new ExpressResponse(200, channel[0], "Channel Info"));
});

// * Get User Watch History
const getWatchHistory = asyncWrapper(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req?.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
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
                    email: 1,
                    avatar: 1,
                    coverImage: 1,
                    subscribedToCount: 1,
                    subscriberCount: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: { $arrayElemAt: ["$owner", 0] },
            },
          },
        ],
      },
    },
  ]);

  res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        user[0].watchHistory,
        "User Watch History Fetch Successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updatePassword,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  updateCoverImage,
  getUserChannel,
  getWatchHistory,
};
