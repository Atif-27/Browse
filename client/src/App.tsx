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
import VideoDetailPage from "./pages/VideoDetailPage";
import ChannelVideoListPage from "./pages/ChannelVideoListPage";
import ChannelPlaylistPage from "./pages/ChannelPlaylistPage";
import ChannelSubscribedPage from "./pages/ChannelSubscribedPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./pages/layouts/Container";
import UploadVideoPage from "./pages/UploadVideoPage";
import PlaylistPage from "./pages/PlaylistPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import SearchPage from "./pages/SearchPage";
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
          path: "/channel/:id",
          element: (
            <AuthLayout>
              <ChannelPage />
            </AuthLayout>
          ),
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
          element: (
            <AuthLayout>
              <UploadVideoPage />
            </AuthLayout>
          ),
        },
        {
          path: "/search",
          element: (
            <AuthLayout>
              <SearchPage />
            </AuthLayout>
          ),
        },
        {
          path: "/playlist",
          element: (
            <AuthLayout>
              <PlaylistPage />
            </AuthLayout>
          ),
        },
        {
          path: "/playlist/:id",
          element: (
            <AuthLayout>
              <PlaylistDetailPage />
            </AuthLayout>
          ),
        },
        {
          path: "/settings",
          element: (
            <AuthLayout>
              <SettingsPage />
            </AuthLayout>
          ),
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
          element: (
            <AuthLayout>
              <DashboardPage />
            </AuthLayout>
          ),
        },

        {
          path: "/video/:id",
          element: (
            <AuthLayout>
              <VideoDetailPage />
            </AuthLayout>
          ),
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
