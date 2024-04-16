import Sidebar from "@/components/shared/Sidebar";
import { loginUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks";
import {
  createComment,
  getCommentsByVideoid,
  updateComment,
} from "@/store/slices/commentSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    const data = {
      username: "",
      email: "test07@gmail.com",
      password: "123456",
    };
    //dispatch(loginUser(data));
    dispatch(
      updateComment({
        commentId: "661ec424a95b8e1ce32d91b9",
        content: "exit",
      })
    );
    console.log();
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
