import Sidebar from "@/components/shared/Sidebar";
import { loginUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks";
import { getVideoById, getVideos } from "@/store/slices/videoSlice";
// import {
//   createComment,
//   getCommentsByVideoid,
//   updateComment,
// } from "@/store/slices/commentSlice";
// import { getVideos } from "@/store/slices/videoSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    const data = {
      username: "",
      email: "test07@gmail.com",
      password: "123456",
    };
    // dispatch(loginUser(data));

    dispatch(getVideoById("661989eab80bbd1a9df74eaf"));
  };
  return (
    <div className="  ">
      <button onClick={handleLogin}>Login</button>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <Sidebar />
    </div>
  );
};

export default HomePage;
