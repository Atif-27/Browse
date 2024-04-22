import { useCallback, useEffect, useRef } from "react";

const InfiniteScroll = ({
  isLoading,
  hasNextPage,
  children,
  Dispatcher,
  setPage,
}: {
  isLoading: boolean;
  hasNextPage: boolean;
  Dispatcher: () => void;
  children: React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // ! Fetching Videos
  useEffect(() => {
    Dispatcher();
  }, [Dispatcher]);
  const observer = useRef<IntersectionObserver>();
  const lastElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [hasNextPage, isLoading, setPage]
  );
  return (
    <div>
      {children}
      <div ref={lastElement}></div>
    </div>
  );
};

export default InfiniteScroll;
