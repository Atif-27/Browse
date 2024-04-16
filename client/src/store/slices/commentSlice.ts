import axiosInstance from "@/helper/axiosInstance";
import { CommentType } from "@/interfaces/commentInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface initialStateType {
  loading: boolean;
  error: string | null;
  comments: CommentType[];
}

const initialState: initialStateType = {
  loading: false,
  error: null,
  comments: [],
};

export const getCommentsByVideoid = createAsyncThunk(
  "getCommentsByVideoid",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/comment/video/${videoId}`);
      return { comments: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while fetching comments";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
export const createComment = createAsyncThunk(
  "createComment",
  async (data: { content: string; videoId: string }, { rejectWithValue }) => {
    try {
      console.log(data);

      const newData = { content: data.content };
      const res = await axiosInstance.post(
        `/comment/video/${data.videoId}`,
        newData
      );
      return { comment: res.data.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while creating comment";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/comment/${commentId}`);
      return commentId;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while deleting comment";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
export const updateComment = createAsyncThunk(
  "updateComment",
  async (data: { commentId: string; content: string }, { rejectWithValue }) => {
    try {
      const newData = { content: data.content };
      await axiosInstance.patch(`/comment/${data.commentId}`, newData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while updating comment";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    cleanupComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    //! Get Comments By VideoId
    builder.addCase(getCommentsByVideoid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCommentsByVideoid.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload?.comments;
    });
    builder.addCase(getCommentsByVideoid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! Create Comment
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = [action.payload?.comment, ...state.comments];
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! Delete
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      const commentId = action.payload;
      state.comments = state.comments.filter(
        (comment) => comment._id !== commentId
      );
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //! Update
    builder.addCase(updateComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload?.commentId
          ? {
              ...comment,
              content: action.payload?.content,
            }
          : comment
      );
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default commentSlice.reducer;
export const { cleanupComments } = commentSlice.actions;
