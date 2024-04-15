import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosInstance";
import { AxiosError } from "axios";
import {
  updatePasswordDataType,
  userDataType,
  userInfoUpdateType,
  userLoginDataType,
} from "@/interfaces/userInterface";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "@/helper/localStorage";

interface initialStateType {
  userData: userDataType | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: initialStateType = {
  userData: getDataFromLocalStorage("userData"),
  isLoggedIn: getDataFromLocalStorage("userData") ? true : false,
  loading: false,
  error: null,
};

// ! Register User Async Function
export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/register", data);
      console.log("User Registered Successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something Went Wrong while Registering User";
        console.log(message);

        return rejectWithValue(message);
      }
    }
  }
);

// ! Login User Async Function
export const loginUser = createAsyncThunk(
  "loginUser",
  async (data: userLoginDataType, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", data);
      setDataInLocalStorage("userData", res.data.data.user);
      return { userData: res.data.data.user };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || "Something Went Wrong while Login";
        console.log(message);

        return rejectWithValue(message);
      }
    }
  }
);

// ! log out user action
export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get("/user/logout");
      localStorage.removeItem("userData");
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || "Something Went Wrong while Logout";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// ! Refresh Token
export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get("/user/refresh_token");
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something Went Wrong while Refreshing Token";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// !Update Password
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (data: updatePasswordDataType, { rejectWithValue }) => {
    try {
      if (data.password === data.newPassword)
        throw new Error("New Password cannot be same as Old Password");

      if (data.newPassword !== data.confirmPassword)
        throw new Error("New Password and Confirm Password should be same");
      const newData = {
        password: data.password,
        newPassword: data.newPassword,
      };
      await axiosInstance.put("/user/update-password", newData);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something Went Wrong while Updating Password";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// ! Update User Info
export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",
  async (data: userInfoUpdateType, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch("/user", data);
      return { userData: res.data.data.user };
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something Went Wrong while Updating User Info";
        console.log(message);
        return rejectWithValue(message);
      }
    }
  }
);

// ! Update User Avatar
// ! Update User Cover Image

// ! Creating Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ! Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // ! Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userData = action.payload?.userData;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // ! Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.userData = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // ! Refresh Token
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // ! Update Password
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // ! Update User Info
    builder.addCase(updateUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload?.userData;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
