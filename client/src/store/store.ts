import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import channelReducer from "./slices/channelSlice";
import commentSlice from "./slices/commentSlice";
import likeSlice from "./slices/likeSlice";
import playlistSlice from "./slices/playlistSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import videoSlice from "./slices/videoSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    comment: commentSlice,
    like: likeSlice,
    playlist: playlistSlice,
    subscription: subscriptionSlice,
    video: videoSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
