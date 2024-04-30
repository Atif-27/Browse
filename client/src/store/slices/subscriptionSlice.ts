import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "@/helper/axiosInstance";
interface Video {
  _id: string;
  thumbnail: string;
  title: string;
  views: number;
  duration: number;
  createdAt: string;
}

interface subscriptions {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  videos: Video[];
}

interface Subscriber {
  subscriber: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    totalSubscribers: number;
  };
}
interface initialStateType {
  loading: boolean;
  error: string;
  subscriptions: subscriptions[] | null;
  subscribers: Subscriber[] | null;
}

const initialState: initialStateType = {
  loading: false,
  error: "",
  subscriptions: [],
  subscribers: null,
};

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (data: { channelId: string }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/subscription/${data.channelId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        const message =
          error?.response?.data?.message ||
          "Something went wrong while toggling subscription";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

export const getSubscribers = createAsyncThunk(
  "getSubscribers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/subscription/subscribers");
      return { subscribers: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while fetching subscribers";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

export const getSubscriptions = createAsyncThunk(
  "getSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/subscription/subscribedTo");
      let data = res.data.data;
      data = data.map((item: { channel: subscriptions }) => item.channel);
      return { subscriptions: data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while fetching subscriptions";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleSubscription.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(toggleSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! Get Subscribers
    builder.addCase(getSubscribers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscribers.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribers = action.payload?.subscribers;
    });
    builder.addCase(getSubscribers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! Get Subscriptions
    builder.addCase(getSubscriptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = action.payload?.subscriptions;
    });
    builder.addCase(getSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export default subscriptionSlice.reducer;
