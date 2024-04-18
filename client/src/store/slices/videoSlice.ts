import axiosInstance from "@/helper/axiosInstance";
import { VideoDataType } from "@/interfaces/videoInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
interface initialStateType {
  loading: boolean;
  error: string;
  videos: {
    docs: VideoDataType[];
    hasNextPage: boolean;
  };
  videoDetails: VideoDataType | null;
  uploading: boolean;
  uploaded: boolean;
}

const initialState: initialStateType = {
  loading: false,
  error: "",
  videos: {
    docs: [],
    hasNextPage: false,
  },
  videoDetails: null,
  uploading: false,
  uploaded: false,
};

export const getVideos = createAsyncThunk(
  "getVideos",
  async (
    {
      userId,
      sortBy,
      sortType,
      query,
      page,
      limit,
    }: {
      userId?: string;
      sortBy?: string;
      sortType?: string;
      query?: string;
      page?: number;
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log({ userId, sortBy, sortType, query, page, limit });

      const url = new URL(`${process.env.BASE_URL}/video`);

      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", String(page));
      if (limit) url.searchParams.set("limit", String(limit));
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      console.log(url.toString());

      const res = await axiosInstance.get(url.toString());
      console.log(res.data.data.docs.length);

      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
    }
  }
);
export const getVideoById = createAsyncThunk(
  "getVideoById",
  async (videoId: string, { rejectWithValue }) => {
    try {
      console.log(videoId);

      const response = await axiosInstance.get(`/video/${videoId}`);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data.message || "Failed to fetch video details";
        return rejectWithValue(message);
      }
    }
  }
);
export const uploadVideo = createAsyncThunk(
  "uploadVideo",
  async (
    {
      title,
      description,
      video,
      thumbnail,
    }: {
      title: string;
      description: string;
      video: File;
      thumbnail: File;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("video", video);
      const response = await axiosInstance.post("/video", formData);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data.message || "Failed to upload video";
        return rejectWithValue(message);
      }
    }
  }
);
export const updateVideo = createAsyncThunk(
  "updateVideo",
  async (
    {
      videoId,
      title,
      description,
      thumbnail,
    }: {
      videoId: string;
      title: string;
      description: string;
      thumbnail: File;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      const response = await axiosInstance.patch(`/video/${videoId}`, formData);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data.message || "Failed to update video";

        return rejectWithValue(message);
      }
    }
  }
);

const deleteVideoById = createAsyncThunk(
  "deleteVideoById",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/video/${videoId}`);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data.message || "Failed to delete video";
        return rejectWithValue(message);
      }
    }
  }
);

export const togglePublishVideo = createAsyncThunk(
  "togglePublishVideo",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/video/${videoId}/togglePublish`
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data.message || "Failed to toggle publish video";
        return rejectWithValue(message);
      }
    }
  }
);
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    resetVideoList: (state) => {
      state.videos.docs = [];
      state.videos.hasNextPage = false;
    },
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    updateIsSubscribed: (
      state,
      {
        payload,
      }: {
        payload: string;
      }
    ) => {
      console.log(payload, state.videoDetails?.owner._id);
      if (state.videoDetails?._id === payload) {
        state.videoDetails.owner.isSubscriber =
          !state.videoDetails.owner.isSubscriber;
      }
    },
  },
  extraReducers: (builder) => {
    // ! getVideos
    builder.addCase(getVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideos.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.videos.docs.push(...payload.docs);
      state.videos.hasNextPage = payload.hasNextPage;
    });
    builder.addCase(getVideos.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    // ! getVideoById
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.videoDetails = payload;
    });
    builder.addCase(getVideoById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    // ! uploadVideo
    builder.addCase(uploadVideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(uploadVideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(uploadVideo.rejected, (state, { payload }) => {
      state.uploading = false;
      state.error = payload as string;
    });
    // ! updateVideo
    builder.addCase(updateVideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(updateVideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(updateVideo.rejected, (state, { payload }) => {
      state.uploading = false;
      state.error = payload as string;
    });
    // ! deleteVideoById
    builder.addCase(deleteVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideoById.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteVideoById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
    // ! togglePublishVideo
    builder.addCase(togglePublishVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(togglePublishVideo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(togglePublishVideo.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export default videoSlice.reducer;
export const { resetVideoList, updateUploadState, updateIsSubscribed } =
  videoSlice.actions;
