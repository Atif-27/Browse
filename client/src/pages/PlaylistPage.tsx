import PageHeading from "@/components/shared/PageHeading";
import PlaylistGrid from "@/components/shared/playlists/PlaylistGrid";
import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import { getCurrentPlaylists } from "@/store/slices/playlistSlice";
import { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";

const PlaylistPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const playlist = useAppSelector((state) => state.playlist);
  console.log(playlist);

  useEffect(() => {
    dispatch(getCurrentPlaylists({ userId: user.userData?._id as string }));
  }, [dispatch]);
  return (
    <section>
      <div className="flex items-center  gap-5">
        <PageHeading>My Playlists</PageHeading>
        <CiCirclePlus size={35} />
      </div>
      <div className=" mt-10">
        <PlaylistGrid playlists={playlist.playlists} />
      </div>
    </section>
  );
};

export default PlaylistPage;
