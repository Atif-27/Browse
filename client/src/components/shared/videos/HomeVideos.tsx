import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import { getVideos, resetVideoList } from "@/store/slices/videoSlice";
import { useCallback, useEffect, useState } from "react";
import SkeletonList from "../../skeleton/SkeletonList";
import InfiniteScroll from "../InfiniteScroll";
import VideoGrid from "./VideoGrid";

const HomeVideos = () => {
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
    <section>
      <InfiniteScroll
        isLoading={videos.loading}
        hasNextPage={videos.videos.hasNextPage}
        Dispatcher={Dispatcher}
        setPage={setPage}
      >
        <VideoGrid videoList={videos.videos.docs} />
      </InfiniteScroll>
      {videos.loading && <SkeletonList />}
    </section>
  );
};

export default HomeVideos;
