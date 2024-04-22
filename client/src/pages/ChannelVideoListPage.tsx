import InfiniteScroll from "@/components/shared/InfiniteScroll";
import VideoGrid from "@/components/shared/VideoGrid";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getVideos, resetVideoList } from "@/store/slices/videoSlice";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChannelVideoListPage = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const videos = useAppSelector((state) => state.video);
  const Dispatcher = useCallback(() => {
    dispatch(
      getVideos({
        limit: 4,
        page,
        userId: id,
      })
    );
  }, [dispatch, page, id]);

  // ! Clearing Videos
  useEffect(() => {
    dispatch(resetVideoList());
  }, [dispatch, id]);
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

export default ChannelVideoListPage;
