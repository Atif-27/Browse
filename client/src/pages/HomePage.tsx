import Sidebar from "@/components/shared/Sidebar";
import { loginUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    const data = {
      username: "",
      email: "testt@gmail.com",
      password: "123456",
    };
    dispatch(loginUser(data));
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
