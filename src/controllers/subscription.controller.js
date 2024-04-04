import Subscription from "../models/subscription.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import ExpressResponse from "../utils/ExpressResponse.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.model.js";

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
  const subscribers = await Subscription.find({ channel });
  const subscribersList = subscribers.map(
    (subscriber) => subscriber.subscriber
  );
  return res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        { subscribersList, noOfSubscriber: subscribersList.length },
        "Subscribers fetched successfully"
      )
    );
});

// * Get all users subscribed to a user
const getSubscribedTo = asyncWrapper(async (req, res) => {
  const subscriber = req.user.id;
  const subscribedTo = await Subscription.find({ subscriber });
  const subscribedToList = subscribedTo.map(
    (subscribedTo) => subscribedTo.channel
  );
  return res
    .status(200)
    .json(
      new ExpressResponse(
        200,
        { subscribedToList, noOfSubscribedTo: subscribedToList.length },
        "Subscribed to fetched successfully"
      )
    );
});

export { toggleSubscription, getSubscribers, getSubscribedTo };
