import SkeletonCard from "./SkeletonCard";

const SkeletonList = () => {
  const list = Array.from({ length: 10 }, (_, i) => i);
  return (
    <section className="grid grid-cols-4 max-w-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10">
      {list?.map((_, index) => {
        return (
          <div key={index}>
            <SkeletonCard />
          </div>
        );
      })}
    </section>
  );
};

export default SkeletonList;
