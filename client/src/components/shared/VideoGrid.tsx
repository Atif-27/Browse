import { VideoDataType } from "@/interfaces/videoInterface";
import VideoCard from "./VideoCard";

const VideoGrid = ({ vidoeList }: { vidoeList: VideoDataType[] }) => {
  return (
    <section className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10">
      {vidoeList.map((video: VideoDataType, index) => {
        return (
          <div key={index}>
            <VideoCard video={video} />
          </div>
        );
      })}
      <div></div>
    </section>
  );
};

export default VideoGrid;
