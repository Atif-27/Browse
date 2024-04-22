import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  createComment,
  getCommentsByVideoid,
} from "@/store/slices/commentSlice";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import { Input } from "../ui/input";

const CommentSection = () => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const comment = useAppSelector((state) => state.comment);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const Dispatcher = useCallback(() => {
    console.log(page);
    dispatch(getCommentsByVideoid({ videoId: id as string, page, limit: 5 }));
  }, [id, page, dispatch]);
  useEffect(() => {
    // ! Clearing Comments
    return () => {};
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createComment({ videoId: id as string, content: message }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Add a comment"
          className=" text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <InfiniteScroll
        isLoading={comment?.loading}
        hasNextPage={comment.hasNextPage}
        Dispatcher={Dispatcher}
        setPage={setPage}
      >
        {comment.comments.map((comment) => (
          <div key={comment._id}>
            <div className="flex items-center">
              <img
                src={comment.owner.avatar}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <p className="ml-2 text-sm">{comment.owner.username}</p>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CommentSection;
