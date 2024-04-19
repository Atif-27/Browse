import { allPlaylistType } from "@/interfaces/playlistInterface";
import PlaylistCard from "./PlaylistCard";

const PlaylistGrid = ({ playlists }: { playlists: allPlaylistType[] }) => {
  return (
    <section className="grid grid-cols-4 max-w-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10">
      {playlists.map((playlist: allPlaylistType, index) => {
        return (
          <div key={index}>
            <PlaylistCard playlist={playlist} />
          </div>
        );
      })}
      <div></div>
    </section>
  );
};

export default PlaylistGrid;
