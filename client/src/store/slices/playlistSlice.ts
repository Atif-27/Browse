import axiosInstance from "@/helper/axiosInstance";
import { allPlaylistType, playlistType } from "@/interfaces/playlistInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface initialStateInterface {
  loading: boolean;
  playlists: allPlaylistType[];
  playlist: playlistType | null;
  error: string | null;
}

const initialState: initialStateInterface = {
  loading: false,
  playlists: [],
  playlist: null,
  error: null,
};

export const getCurrentPlaylists = createAsyncThunk(
  "getCurrentPlaylists",
  async (
    data: {
      userId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get(`playlist/user/${data.userId}`);
      return { playlists: res.data.data };
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
export const createUserPlaylist = createAsyncThunk(
  "createUserPlaylist",
  async (data: { name: string; description: string }, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/playlist", data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while creating playlist";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
export const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async (playlistId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/playlist/${playlistId}`);
      return { playlist: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while fetching playlist";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

export const updatePlaylistById = createAsyncThunk(
  "updatePlaylistById",
  async (
    data: { playlistId: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const newData = { name: data.name, description: data.description };
      await axiosInstance.put(`/playlist/${data.playlistId}`, newData);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while updating playlist";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
export const deletePlaylistById = createAsyncThunk(
  "deletePlaylistById",
  async (playlistId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/playlist/${playlistId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while deleting playlist";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "addVideoToPlaylist",
  async (
    data: { playlistId: string; videoId: string },
    { rejectWithValue }
  ) => {
    try {
      const newData = { videoId: data.videoId };
      await axiosInstance.put(`/playlist/video/${data.playlistId}`, newData);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while adding video to playlist";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "removeVideoFromPlaylist",
  async (
    data: { playlistId: string; videoId: string },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/playlist/video/${data.playlistId}`, {
        params: {
          videoId: data.videoId,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while removing video from playlist";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearPlaylist: (state) => {
      state.playlists = [];
    },
  },
  extraReducers: (builder) => {
    //! getCurrentPlaylists
    builder.addCase(getCurrentPlaylists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentPlaylists.fulfilled, (state, action) => {
      state.loading = false;
      state.playlists = action.payload?.playlists;
    });
    builder.addCase(getCurrentPlaylists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! createUserPlaylist
    builder.addCase(createUserPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserPlaylist.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createUserPlaylist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! getPlaylistById
    builder.addCase(getPlaylistById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaylistById.fulfilled, (state, action) => {
      state.loading = false;
      state.playlist = action.payload?.playlist;
    });
    builder.addCase(getPlaylistById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! updatePlaylistById
    builder.addCase(updatePlaylistById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePlaylistById.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePlaylistById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! deletePlaylistById
    builder.addCase(deletePlaylistById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlaylistById.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePlaylistById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! addVideoToPlaylist
    builder.addCase(addVideoToPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVideoToPlaylist.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addVideoToPlaylist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default playlistSlice.reducer;
export const { clearPlaylist } = playlistSlice.actions;
