import { VideoDataType } from "@/interfaces/videoInterface";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";
import { calculateTimeDifference } from "@/helper/format";
const VideoCard = ({ video }: { video: VideoDataType }) => {
  const navigate = useNavigate();
  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    e.preventDefault();
    navigate(`/channel/${video.owner.username}/videos`);
  }
  return (
    <Link to={`video/${video._id}`}>
      <img src={video.thumbnail} alt={video.title} className=" rounded-xl  " />

      <div className=" grid grid-cols-6 gap-3 mt-4 ">
        <img
          src={video.owner.avatar}
          alt={video.owner.username}
          className="w-10 h-10 rounded-full cursor-pointer mt-2"
          onClick={handleClick}
        />
        <div className=" text-sm text-gray-400 col-span-5">
          <p className=" text-lg  text-white text-bold text-ellipsis overflow-hidden      ">
            {video.title}
          </p>

          <p onClick={handleClick}>{video.owner.username}</p>

          <div className="flex gap-5">
            <p>{numeral(video.views).format("0.a").toUpperCase()} views</p>
            <p>{calculateTimeDifference(new Date(video.createdAt || ""))}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
