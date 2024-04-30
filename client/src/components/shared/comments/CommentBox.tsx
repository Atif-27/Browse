import { calculateTimeDifference } from "@/helper/format";
import { CommentType } from "@/interfaces/commentInterface";
import { useAppDispatch } from "@/reduxHooks";
import {
  deleteComment,
  likeComment,
  updateComment,
} from "@/store/slices/commentSlice";
import LikeIcon from "../LikeIcon";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
const CommentBox = ({ comment }: { comment: CommentType }) => {
  const dispatch = useAppDispatch();
  const contentRef = useRef<HTMLInputElement | null>(null);
  async function handleLike() {
    dispatch(likeComment(comment._id));
  }

  async function handleCommentDelete(commentId: string) {
    dispatch(deleteComment(commentId));
  }
  async function handleCommentUpdate(commentId: string) {
    const content = contentRef.current?.value;
    console.log(content);

    dispatch(updateComment({ commentId, content: content as string }));
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
      <div className="text-center flex gap-5 ">
        <div>
          <LikeIcon handleLike={handleLike} isLiked={comment.isLiked} />
          <p className="mt-1">{comment.likeCount}</p>
        </div>
        {comment.owner.isOwner ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <BsThreeDotsVertical />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="  -mt-10  -ml-24">
              <DropdownMenuItem
                onClick={() => handleCommentDelete(comment._id)}
              >
                Delete
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="hover:bg-violet-50 rounded-sm px-2 py-1.5 w-full h-full text-sm ">
                    Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Your Comment</AlertDialogTitle>
                    <AlertDialogDescription>
                      <Label htmlFor="comment">Comment</Label>
                      <Input
                        name="comment"
                        id="comment"
                        className="w-full p-2 rounded-lg border mt-5 outline-none active:outline-none focus:outline-none"
                        placeholder="Write your comment"
                        ref={contentRef}
                      ></Input>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction asChild>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleCommentUpdate(comment._id);
                        }}
                      >
                        Save
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <BsThreeDotsVertical className="opacity-0" />
        )}
      </div>
    </div>
  );
};

export default CommentBox;
