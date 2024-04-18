import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./pages/layouts/AuthLayout";
import ChannelPage from "./pages/ChannelPage";
import SettingsPage from "./pages/SettingsPage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import LikedVideoPage from "./pages/LikedVideoPage";
import VideoDetailPage from "./pages/VideoDetailPage";
import ChannelVideoListPage from "./pages/ChannelVideoListPage";
import ChannelPlaylistPage from "./pages/ChannelPlaylistPage";
import ChannelSubscribedPage from "./pages/ChannelSubscribedPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./pages/layouts/Container";
import UploadVideo from "./pages/UploadVideo";
function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <Container />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            {
              path: "/channel/:id",
              element: <ChannelPage />,
              children: [
                {
                  path: "videos", // Base path for ChannelPage
                  element: <ChannelVideoListPage />,
                },
                {
                  path: "playlists", // Relative path for playlists
                  element: <ChannelPlaylistPage />,
                },
                {
                  path: "subscribed", // Relative path for subscribed
                  element: <ChannelSubscribedPage />,
                },
              ],
            },
            {
              path: "/upload-video",
              element: <UploadVideo />,
            },
            {
              path: "/settings",
              element: <SettingsPage />,
              children: [
                {
                  path: "profile", // Base path for SettingsPage
                  element: <EditProfilePage />,
                },
                {
                  path: "password", // Relative path for password
                  element: <ChangePasswordPage />,
                },
              ],
            },

            {
              path: "/dashboard",
              element: <DashboardPage />,
            },
            {
              path: "/history",
              element: <HistoryPage />,
            },
            {
              path: "/liked-videos",
              element: <LikedVideoPage />,
            },
            {
              path: "/video/:id",
              element: <VideoDetailPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
