import PageHeading from "@/components/shared/PageHeading";
import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import { getSubscriptions } from "@/store/slices/subscriptionSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SubscriptionPage = () => {
  const dispatch = useAppDispatch();
  const channels = useAppSelector((state) => state.subscription.subscriptions);
  console.log(channels);
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  return (
    <div>
      <PageHeading>Subscriptions</PageHeading>
      <div className="pt-20 flex gap-20 flex-wrap">
        {channels!.map((channel) => (
          <Link
            to={"/channel/" + channel._id + "/videos"}
            key={channel._id}
            className=" max-w-sm flex flex-col gap-4 justify-center items-center "
          >
            <img
              src={channel.avatar}
              alt="avatar"
              className=" h-40 aspect-square object-cover rounded-full "
            />
            <p className="font-bold text-2xl ">{channel.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
