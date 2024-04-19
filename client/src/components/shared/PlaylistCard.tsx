import { calculateTimeDifference } from "@/helper/format";
import { allPlaylistType } from "@/interfaces/playlistInterface";
import numeral from "numeral";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }: { playlist: allPlaylistType }) => {
  return (
    <Link to={`/playlist/${playlist._id}`}>
      <img
        src={playlist.thumbnail}
        alt={playlist.name}
        className=" rounded-xl w-full rouned-t-3xl"
      />

      <div className=" grid grid-cols-6  w-full bg-stone-500 px-4 py-4 rounded-b-3xl ">
        <div className=" text-sm  col-span-5  ">
          <p className=" text-lg  text-white text-bold text-ellipsis overflow-hidden      ">
            {playlist.name}
          </p>
          {/* <p onClick={handleClick}>{video.owner.username}</p> */}
          <div className="flex gap-5">
            <p>
              {numeral(playlist.totalViews).format("0.a").toUpperCase()} Views
            </p>
            <p>
              {numeral(playlist.totalVideos).format("0.a").toUpperCase()} Videos
            </p>
          </div>{" "}
          <p>
            {" "}
            Last Updated{" "}
            {calculateTimeDifference(new Date(playlist.updatedAt || ""))}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
