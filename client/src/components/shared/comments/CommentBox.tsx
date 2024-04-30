import { calculateTimeDifference } from "@/helper/format";
import { CommentType } from "@/interfaces/commentInterface";
import { useAppDispatch } from "@/reduxHooks";
import { likeComment } from "@/store/slices/commentSlice";
import LikeIcon from "../LikeIcon";
import { BsThreeDotsVertical } from "react-icons/bs";

const CommentBox = ({ comment }: { comment: CommentType }) => {
  const dispatch = useAppDispatch();
  async function handleLike() {
    dispatch(likeComment(comment._id));
  }
  return (
    <div className=" bg-primary_gray p-4 rounded-lg flex justify-between gap-4">
      <div className="flex items-start justify-start gap-5 ">
        <img
          src={comment.owner.avatar}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover object-center"
        ></img>
        <div>
          <div className="flex gap-4  items-center">
            <p className="text-lg font-bold">{comment.owner.username}</p>

            <p className="text-xs">
              {calculateTimeDifference(new Date(comment.createdAt))}
            </p>
          </div>
          <p className="text-md mt-2">{comment.content}</p>
        </div>
      </div>
      <div className="text-center ">
        {comment.owner.isOwner && "asdasdasdasdd"}
        <LikeIcon handleLike={handleLike} isLiked={comment.isLiked} />
        <p className="mt-1">{comment.likeCount}</p>
      </div>
    </div>
  );
};

export default CommentBox;
