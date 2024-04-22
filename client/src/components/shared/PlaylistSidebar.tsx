import { calculateTimeDifference } from "@/helper/format";
import numeral from "numeral";

const PlaylistSidebar = ({
  thumbnail,
  name,
  description,
  ownerName,
  totalVideos,
  totalViews,
  updatedAt,
}: {
  thumbnail: string;
  name: string;
  description: string;
  ownerName?: string;
  totalVideos?: number;
  totalViews?: number;
  updatedAt?: string;
}) => {
  return (
    <div className=" bg-primary_gray text-gray-400 h-screen max-h-[85%] p-10  rounded-3xl leading-10">
      <img
        src={thumbnail || ""}
        alt="thumbnail"
        width={800}
        className="aspect-video "
      />
      <h1 className="text-3xl font-semibold pt-10 text-white">{name}</h1>
      <p>{description}</p>
      {ownerName && <p className=" font-bold ">Created by: {ownerName}</p>}

      <div className="flex gap-5">
        {totalVideos && (
          <p className="text-gray-400">
            {totalVideos} {totalVideos > 1 ? "videos" : "video"}
          </p>
        )}
        {totalViews && (
          <p className="text-gray-400 ">
            {numeral(totalViews).format("0.a")} views
          </p>
        )}

        <p>
          Last updated{" "}
          {updatedAt && calculateTimeDifference(new Date(updatedAt))}{" "}
        </p>
      </div>
    </div>
  );
};

export default PlaylistSidebar;
