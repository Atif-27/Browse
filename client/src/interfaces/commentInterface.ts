export interface CommentType {
  _id: string;
  owner: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
    isOwner?: boolean;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  isLiked: boolean;
}
