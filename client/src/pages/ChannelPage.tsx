import ToggleSubscribtion from "@/components/layout/ToggleSubscription";
import UserSpace from "@/components/layout/UserSpace";
import ViewerSpace from "@/components/layout/ViewerSpace";
import ChannelMenu from "@/components/shared/ChannelMenu";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getChannelDetail } from "@/store/slices/channelSlice";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const ChannelPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const channel = useAppSelector((state) => state.channel);
  const userId = useAppSelector((state) => state.user.userData?._id);
  const ownerId = channel.channelDetail?._id;
  useEffect(() => {
    async function fetchChannelData() {
      dispatch(getChannelDetail(id as string));
    }
    fetchChannelData();
  }, []);
  console.log(channel);

  return (
    <section className=" max-w-screen-2xl mx-auto">
      <div>
        <img
          src={channel.channelDetail?.coverImage}
          alt="channel cover"
          className="w-full h-72 object-cover  object-center "
        />
        <div className="flex justify-between items-center">
          <div className="ml-10 flex gap-7  ">
            <img
              src={channel.channelDetail?.avatar}
              alt="avatar"
              className="w-40 h-40 object-cover object-center rounded-full -mt-8"
            />
            <div className=" text-gray-400 text-sm mt-4">
              <h1 className="text-2xl font-bold text-white">
                {channel.channelDetail?.fullName}
              </h1>
              <p>@{channel.channelDetail?.username}</p>
              <div className="flex gap-2">
                <p>{channel.channelDetail?.subscriberCount} Subscribers</p>
                <p>{channel.channelDetail?.subscribedToCount} Subscribed </p>
              </div>
            </div>
          </div>
          <ViewerSpace userId={userId as string} ownerId={ownerId as string}>
            <ToggleSubscribtion
              channelId={channel.channelDetail?._id as string}
            >
              <Button className="bg-primary_orange">
                {channel.channelDetail?.isSubscribed
                  ? "UnSubscribe"
                  : "Subscribe"}
              </Button>
            </ToggleSubscribtion>
          </ViewerSpace>
          <UserSpace userId={userId as string} ownerId={ownerId as string}>
            <Button className="bg-primary_orange">Edit Channel</Button>
          </UserSpace>
        </div>
      </div>
      <div>
        {/* ! Menu */}
        <ChannelMenu />
        <Outlet />
      </div>
    </section>
  );
};

export default ChannelPage;
