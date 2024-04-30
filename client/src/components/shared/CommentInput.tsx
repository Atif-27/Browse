import { useRef } from "react";
import { Input } from "../ui/input";
import { createComment } from "@/store/slices/commentSlice";
import { useAppDispatch } from "@/reduxHooks";
import { Button } from "../ui/button";

const CommentInput = ({ videoId }: { videoId: string }) => {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = messageRef.current?.value as string;
    dispatch(createComment({ videoId: videoId as string, content: message }));
    messageRef.current!.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-end items-end"
    >
      <Input
        placeholder="Add a comment"
        className=" text-black
        border border-gray-300
        focus:outline-none
        focus:ring-2
       roundex-lg
       p-4
       py-6
    text-md
        "
        ref={messageRef}
      />
      <Button className="bg-primary_orange">Comment</Button>
    </form>
  );
};

export default CommentInput;
