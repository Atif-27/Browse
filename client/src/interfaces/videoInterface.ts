export interface VideoDataType {
  _id: string;
  videoFile?: string;
  thumbnail: string;
  owner: {
    _id: string;
    username: string;
    fullName?: string;
    email?: string;
    avatar: string;
    coverImage?: string;
    subscribers?: number;
    isSubscribed?: boolean;
  };
  title: string;
  description: string;
  views: number;
  duration: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
  likeCount?: number;
  isLiked?: boolean;
  __v?: number;
}
