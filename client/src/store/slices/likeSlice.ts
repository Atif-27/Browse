import { VideoDataType } from "@/interfaces/videoInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/helper/axiosInstance";

interface intitalStateType {
  loading: boolean;
  error: string;
  likes: VideoDataType[];
}

const initialState: intitalStateType = {
  loading: false,
  error: "",
  likes: [],
};

// ! Get All Likes Async Function
export const getAllLikedVideo = createAsyncThunk(
  "getAllLikedVideo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/like");
      return { likedVideos: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while fetching liked videos";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// ! Like Video Async Function
export const likeVideo = createAsyncThunk(
  "likeVideo",
  async (videoId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/like/${videoId}`, {
        onModel: "Video",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while liking video";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
// ! Like Comment Async Function
export const likeComment = createAsyncThunk(
  "likeComment",
  async (commentId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/like/${commentId}`, {
        onModel: "Comment",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while liking comment";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// ! Like Slice
const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLikedVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllLikedVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.likes = action.payload?.likedVideos;
    });
    builder.addCase(getAllLikedVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default likeSlice.reducer;
