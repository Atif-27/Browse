import PageHeading from "@/components/shared/PageHeading";
import PlaylistGrid from "@/components/shared/PlaylistGrid";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCurrentPlaylists } from "@/store/slices/playlistSlice";
import { useEffect } from "react";

const PlaylistPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const playlist = useAppSelector((state) => state.playlist);
  console.log(playlist);

  useEffect(() => {
    dispatch(getCurrentPlaylists({ userId: user.userData?._id as string }));
  }, []);
  return (
    <section>
      <PageHeading>My Playlists</PageHeading>
      <div className=" mt-10">
        <PlaylistGrid playlists={playlist.playlists} />
      </div>
    </section>
  );
};

export default PlaylistPage;
