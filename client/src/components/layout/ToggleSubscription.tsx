import { useAppDispatch } from "@/reduxHooks";
import { toggleSubscription } from "@/store/slices/subscriptionSlice";
import { updateIsSubscribed } from "@/store/slices/videoSlice";

const ToggleSubscribtion = ({
  children,
  channelId,
  videoId,
}: {
  children: JSX.Element;
  channelId: string;
  videoId?: string;
}) => {
  const dispatch = useAppDispatch();

  function handleSubscription() {
    dispatch(toggleSubscription({ channelId }));
    videoId && dispatch(updateIsSubscribed(videoId));
  }
  return (
    <div onClick={handleSubscription} className="w-fit h-fit">
      {children}
    </div>
  );
};

export default ToggleSubscribtion;
