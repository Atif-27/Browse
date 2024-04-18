import VideoGrid from "@/components/shared/VideoGrid";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getVideos, resetVideoList } from "@/store/slices/videoSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.video);
  useEffect(() => {
    async function Dispatcher() {
      await dispatch(resetVideoList());
      await dispatch(
        getVideos({
          limit: 12,
          page: 1,
        })
      );
    }
    Dispatcher();
  }, []);
  return (
    <div className=" text-white">
      <VideoGrid vidoeList={videos.videos.docs} />
    </div>
  );
};

export default HomePage;
