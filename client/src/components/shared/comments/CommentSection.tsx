import { useAppDispatch, useAppSelector } from "@/reduxHooks";
import {
  cleanupComments,
  getCommentsByVideoid,
} from "@/store/slices/commentSlice";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../InfiniteScroll";
import CommentInput from "./CommentInput";
import CommentBox from "./CommentBox";

const CommentSection = ({ videoId }: { videoId: string }) => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector((state) => state.comment);
  const [page, setPage] = useState(1);
  const Dispatcher = useCallback(() => {
    console.log(page);
    dispatch(
      getCommentsByVideoid({ videoId: videoId as string, page, limit: 5 })
    );
  }, [videoId, page, dispatch]);
  useEffect(() => {
    // ! Clearing Comments
    return () => {
      dispatch(cleanupComments());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-10 mt-10">
      <CommentInput videoId={videoId} />
      <InfiniteScroll
        isLoading={comment?.loading}
        hasNextPage={comment.hasNextPage}
        Dispatcher={Dispatcher}
        setPage={setPage}
      >
        <div className="flex flex-col gap-8">
          {comment.comments.map((comment) => (
            <div key={comment._id}>
              <CommentBox comment={comment} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CommentSection;
