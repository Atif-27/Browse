import { useAppDispatch, useAppSelector } from "@/hooks";
import { getVideoById } from "@/store/slices/videoSlice";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import ViewerSpace from "@/components/layout/ViewerSpace";
import ToggleSubscribtion from "@/components/layout/ToggleSubscription";

const VideoDetailPage = () => {
  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.video.videoDetails);
  const params = useParams();
  console.log(video);
  const userId = useAppSelector((state) => state.user.userData?._id);
  useEffect(() => {
    dispatch(getVideoById(params.id as string));
  }, []);
  return (
    <section>
      <div className="max-w-6xl max-xl:max-w-3xl ">
        <video
          src={video?.videoFile}
          controls
          className="w-full aspect-video"
        ></video>
        <div className="mt-4 ml-4">
          <p className="text-3xl font-bold">{video?.title}</p>
          <div className="mt-4 flex gap-3">
            <Link
              to={`/channel/${video?.owner.username}/videos`}
              className="flex gap-2"
            >
              <img
                src={video?.thumbnail}
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

            <div>
              <ViewerSpace
                userId={userId as string}
                ownerId={video?.owner._id as string}
              >
                <ToggleSubscribtion
                  channelId={video?.owner._id as string}
                  videoId={video?._id}
                >
                  <Button className="bg-primary_orange">
                    {video?.owner.isSubscriber ? "UnSubscribe" : "Subscribe"}
                  </Button>
                </ToggleSubscribtion>
              </ViewerSpace>
            </div>
          </div>
        </div>
        <div className=" bg-stone-600  w-full mt-10  p-6 rounded-2xl">
          <div className="font-semibold gap-4 flex">
            <p>{video?.views + " "} Views </p>
            <p>{video?.views + " "} Views </p>
          </div>
          <p className="">{video?.description}</p>
        </div>
      </div>
    </section>
  );
};

export default VideoDetailPage;
