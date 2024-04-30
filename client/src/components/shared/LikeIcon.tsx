import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeIcon = ({
  handleLike,
  isLiked,
}: {
  handleLike: () => void;
  isLiked: boolean;
}) => {
  return (
    <div onClick={handleLike} className="w-fit h-fit cursor-pointer">
      {!isLiked ? <FaRegHeart /> : <FaHeart />}
    </div>
  );
};

export default LikeIcon;
