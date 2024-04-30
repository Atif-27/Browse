import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <div>
      <Skeleton className=" rounded-xl w-full aspect-video object-cover  " />

      <div className=" grid grid-cols-6 gap-3 mt-4 ">
        <Skeleton className="w-10 h-10 rounded-full cursor-pointer mt-2" />
        <div className=" text-sm text-gray-400 col-span-5">
          <div className=" text-lg  text-white text-bold text-ellipsis overflow-hidden">
            <Skeleton className=" w-5/6 h-7 mb-2 " />
          </div>

          <div>
            <Skeleton className="h-4 w-6/12 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
