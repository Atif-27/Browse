import PlaylistSidebar from "@/components/shared/PlaylistSidebar";
import VideoGrid from "@/components/shared/VideoGrid";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getHistory } from "@/store/slices/channelSlice";
import { getAllLikedVideo } from "@/store/slices/likeSlice";
import { getPlaylistById } from "@/store/slices/playlistSlice";
import React from "react";
import { useParams } from "react-router-dom";

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const playlist = useAppSelector((state) => state.playlist);
  const like = useAppSelector((state) => state.like);
  const history = useAppSelector((state) => state.channel.history);
  console.log(like);

  React.useEffect(() => {
    id === "liked-videos" && dispatch(getAllLikedVideo());
    id === "history" && dispatch(getHistory());
    id && dispatch(getAllLikedVideo());
    Number.isInteger(parseInt(id as string)) &&
      dispatch(getPlaylistById(id as string));
  }, [id]);
  return (
    <section className=" grid grid-cols-3 max-md:flex max-md:flex-col gap-20 ">
      <div className="col-span-1  md:block md:sticky top-0">
        {Number.isInteger(parseInt(id as string)) && (
          <PlaylistSidebar
            thumbnail={playlist.playlist?.videos[0]?.thumbnail as string}
            name={playlist.playlist?.name as string}
            description={playlist.playlist?.description as string}
            ownerName={playlist.playlist?.owner.username as string}
            totalVideos={playlist.playlist?.videos.length}
            totalViews={playlist.playlist?.totalViews}
            updatedAt={playlist.playlist?.updatedAt}
          />
        )}
        {id === "liked-videos" && (
          <PlaylistSidebar
            thumbnail={like.likes[0]?.thumbnail as string}
            name="Liked Videos"
            description="All Of your liked videos are here "
            totalVideos={like.likes?.length}
            totalViews={like.likes.reduce((acc, curr) => acc + curr.views, 0)}
            updatedAt={like.likes[0]?.updatedAt}
          />
        )}
        {id === "history" && (
          <PlaylistSidebar
            thumbnail={history[0]?.thumbnail as string}
            name="History"
            description="All Of your watched videos are here "
            totalVideos={history?.length}
            totalViews={history.reduce((acc, curr) => acc + curr.views, 0)}
            updatedAt={history[0]?.updatedAt}
          />
        )}
      </div>
      <div className=" col-span-2  ">
        {id === "liked-videos" ? (
          <VideoGrid videoList={like.likes || null} />
        ) : id === "history" ? (
          <VideoGrid videoList={history || null} />
        ) : (
          <VideoGrid videoList={playlist.playlist?.videos || null} />
        )}
      </div>
    </section>
  );
};

export default PlaylistDetailPage;
