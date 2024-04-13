import Subscription from "../models/subscription.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
// * Toggle subscription to a user
const toggleSubscription = asyncWrapper(async (req, res) => {
  const channel = req.params?.channelId;
  const subscriber = req.user.id;
  if (channel === subscriber) {
    throw new ExpressError(400, "You can't subscribe to yourself");
  }
  const channelExists = await User.findById(channel);
  if (!channelExists) {
    throw new ExpressError(404, "Channel not found");
  }
  const subscriberExists = await User.findById(subscriber);
  if (!subscriberExists) {
    throw new ExpressError(404, "Subscriber not found");
  }
  const subscribtion = await Subscription.findOne({
    $and: [{ subscriber }, { channel }],
  });
  if (!subscribtion) {
    const newSubscribtion = await Subscription.create({ subscriber, channel });
    return res
      .status(201)
      .json(
        new ExpressResponse(201, newSubscribtion, "Subscribed successfully")
      );
  } else {
    await Subscription.findByIdAndDelete(subscribtion._id);
    return res
      .status(200)
      .json(new ExpressResponse(200, [], "Unsubscribed successfully"));
  }
});
// * Get all subscribers of a user
const getSubscribers = asyncWrapper(async (req, res) => {
  const channel = req.user.id;
  // const subscribers = await Subscription.find({ channel });
  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channel),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              foreignField: "channel",
              localField: "_id",
              as: "totalSubscribers",
            },
          },
          {
            $addFields: {
              totalSubscribers: { $size: "$totalSubscribers" },
            },
          },
        ],
      },
    },

    {
      $project: {
        _id: 0,
        subscriber: {
          _id: 1,
          username: 1,
          email: 1,
          avatar: 1,
          totalSubscribers: 1,
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ExpressResponse(200, subscribers, "Subscribers fetched successfully")
    );
});

// * Get all users subscribed to a user
const getSubscribedTo = asyncWrapper(async (req, res) => {
  const subscriber = req.user.id;

  const subscribedTo = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriber),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
        pipeline: [
          {
            $lookup: {
              from: "videos",
              localField: "_id",
              foreignField: "owner",
              as: "videos",
            },
          },
        ],
      },
    },
    {
      $unwind: "$channel",
    },
    {
      $project: {
        _id: 0,
        channel: {
          _id: 1,
          username: 1,
          email: 1,
          avatar: 1,
          videos: {
            _id: 1,
            title: 1,
            thumbnail: 1,
            views: 1,
            duration: 1,
            createdAt: 1,
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        subscribedTo,
        "Subscribed to fetched successfully"
      )
    );
});

export { toggleSubscription, getSubscribers, getSubscribedTo };
