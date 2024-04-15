export interface VideoDataType {
  _id: string;
  videoFile: string;
  thumbnail: string;
  owner: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    avatar: string;
    coverImage: string;
  };
  title: string;
  description: string;
  views: number;
  duration: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
