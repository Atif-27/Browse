// import HomeVideos from "@/components/shared/HomeVideos";
import SkeletonList from "@/components/skeleton/SkeletonList";
import { Suspense, lazy } from "react";

const HomeVideos = lazy(() => import("@/components/shared/videos/HomeVideos"));

const HomePage = () => {
  return (
    <div className=" text-white">
      <Suspense fallback={<SkeletonList />}>
        <HomeVideos />
      </Suspense>
    </div>
  );
};

export default HomePage;
