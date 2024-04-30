import PlaylistGrid from "@/components/shared/playlists/PlaylistGrid";
import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import {
  clearPlaylist,
  getCurrentPlaylists,
} from "@/store/slices/playlistSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ChannelPlaylistPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const playlist = useAppSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(clearPlaylist());
    dispatch(getCurrentPlaylists({ userId: id as string }));
  }, [id]);
  return (
    <section>
      <PlaylistGrid playlists={playlist.playlists} />
    </section>
  );
};

export default ChannelPlaylistPage;
