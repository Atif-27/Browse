import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import { getVideoById, likeVideo } from "@/store/slices/videoSlice";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import ViewerSpace from "@/components/layout/ViewerSpace";
import ToggleSubscribtion from "@/components/layout/ToggleSubscription";
import CommentSection from "@/components/shared/comments/CommentSection";
import LikeIcon from "@/components/shared/LikeIcon";

const VideoDetailPage = () => {
  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.video.videoDetails);
  const { id: videoId } = useParams();
  console.log(video);
  const userId = useAppSelector((state) => state.user.userData?._id);
  useEffect(() => {
    dispatch(getVideoById(videoId as string));
  }, [videoId, dispatch]);
  function handleLike() {
    dispatch(likeVideo(videoId as string));
  }
  return (
    <section className="max-w-6xl max-xl:max-w-3xl">
      {/* Video Section */}
      <div className=" ">
        <video
          src={video?.videoFile}
          controls
          className="w-full aspect-video"
        ></video>
        <div className="mt-4 ml-4">
          <p className="text-3xl font-bold">{video?.title}</p>
          <div className="mt-4 flex gap-3 justify-between">
            <Link
              to={`/channel/${video?.owner._id}/videos`}
              className="flex gap-2"
            >
              <img
                src={video?.owner?.avatar}
                alt="thumbnail"
                className="w-14 h-14 rounded-full object-cover object-center"
              />
              <div>
                <p className="text-lg font-bold">{video?.owner?.username}</p>
                <p className="text-sm">
                  {numeral(video?.owner?.subscriberCount)
                    .format("0.a")
                    .toUpperCase()}{" "}
                  Subscribers
                </p>
              </div>
            </Link>

            <div className="flex  items-center justify-center gap-10 text-center">
              <div>
                <LikeIcon
                  isLiked={video?.isLiked as boolean}
                  handleLike={handleLike}
                />
                <p>{video?.likeCount}</p>
              </div>
              <ViewerSpace
                userId={userId as string}
                ownerId={video?.owner._id as string}
              >
                <ToggleSubscribtion
                  channelId={video?.owner._id as string}
                  videoId={video?._id}
                >
                  <Button className="bg-primary_orange">
                    {video?.owner.isSubscriber ? "Unsubscribe" : "Subscribe"}
                  </Button>
                </ToggleSubscribtion>
              </ViewerSpace>
            </div>
          </div>
        </div>
        {/* ! Description */}
        <div className=" bg-stone-600  w-full mt-10  p-6 rounded-2xl">
          <div className="font-semibold gap-4 flex">
            <p>{video?.views + " "} Views </p>
            <p>{video?.views + " "} Views </p>
          </div>
          <p className="">{video?.description}</p>
        </div>
      </div>
      {/* ! Comment Section */}
      <CommentSection videoId={videoId as string} />
    </section>
  );
};

export default VideoDetailPage;
