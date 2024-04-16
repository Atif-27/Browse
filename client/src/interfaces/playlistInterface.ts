import { VideoDataType } from "./videoInterface";

export interface playlistType {
  _id: string;
  name: string;
  description: string;
  videos: VideoDataType[];
  owner: {
    _id: string;
    username: string;
    fullName?: string;
    email?: string;
    avatar: string;
    coverImage?: string;
  };
  createdAt: string;
  updatedAt: string;
  totalVideos: number;
  totalViews: number;
  __v: number;
}

export interface allPlaylistType {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  totalVideos: number;
  totalViews: number;
  thumbnail?: string;
  __v?: number;
}
