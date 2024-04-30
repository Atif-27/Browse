import InfiniteScroll from "@/components/shared/InfiniteScroll";
import VideoGrid from "@/components/shared/videos/VideoGrid";
import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import { getVideos, resetVideoList } from "@/store/slices/videoSlice";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.video);
  const query = searchParams.get("q");
  // ! Clear Videos
  useEffect(() => {
    dispatch(resetVideoList());
  }, [dispatch, query]);

  const Dispatcher = useCallback(() => {
    query &&
      dispatch(
        getVideos({
          query: query || "",
          page,
          limit: 5,
        })
      );
  }, [dispatch, page, query]);
  return (
    <section>
      <InfiniteScroll
        isLoading={video.loading}
        hasNextPage={video.videos.hasNextPage}
        Dispatcher={Dispatcher}
        setPage={setPage}
      >
        <VideoGrid videoList={video.videos.docs} />
      </InfiniteScroll>
    </section>
  );
};

export default SearchPage;
