import InfiniteScroll from "@/components/shared/InfiniteScroll";
import VideoGrid from "@/components/shared/VideoGrid";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getVideos, resetVideoList } from "@/store/slices/videoSlice";
import { useCallback, useEffect, useState } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const videos = useAppSelector((state) => state.video);
  const Dispatcher = useCallback(() => {
    dispatch(
      getVideos({
        limit: 12,
        page,
      })
    );
  }, [dispatch, page]);

  // ! Clearing Videos
  useEffect(() => {
    dispatch(resetVideoList());
  }, [dispatch]);

  return (
    <div className=" text-white">
      <InfiniteScroll
        isLoading={videos.loading}
        hasNextPage={videos.videos.hasNextPage}
        Dispatcher={Dispatcher}
        setPage={setPage}
      >
        <VideoGrid videoList={videos.videos.docs} />
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
