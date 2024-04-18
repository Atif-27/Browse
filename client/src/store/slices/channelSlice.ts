import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosInstance";
import { AxiosError } from "axios";
import { channelDataType } from "@/interfaces/channelInterface";
import { VideoDataType } from "@/interfaces/videoInterface";
interface initialStateType {
  history: VideoDataType[];
  channelDetail: channelDataType | null;
  loading: boolean;
  error: string | null;
}
const initialState: initialStateType = {
  history: [],
  channelDetail: null,
  loading: false,
  error: null,
};

// ! Get Channel Detail Async Function
export const getChannelDetail = createAsyncThunk(
  "getChannelDetail",
  async (channelId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/user/channel/${channelId}`);
      return { channelDetail: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something Went Wrong while fetching Channel Details";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// ! Get Channel History Async Function
export const getHistory = createAsyncThunk(
  "getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/watch-history");
      return { history: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something Went Wrong while fetching Channel History";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // !  Channel Detail
    builder.addCase(getChannelDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChannelDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.channelDetail = action.payload?.channelDetail;
    });
    builder.addCase(getChannelDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ! Channel History
    builder.addCase(getHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload?.history;
    });
    builder.addCase(getHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default channelSlice.reducer;
