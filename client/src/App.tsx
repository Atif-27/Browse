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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
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
              path: "", // Base path for ChannelPage
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
          path: "/edit",
          element: <SettingsPage />,
          children: [
            {
              path: "", // Base path for SettingsPage
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
