import { useAppDispatch, useAppSelector } from "@/hooks";
import { logoutUser } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const nagivate = useNavigate();
  async function handleClick() {
    if (!user.isLoggedIn) return nagivate("/");
    await dispatch(logoutUser());

    nagivate("/");
  }
  return (
    <div className="w-fit h-fit" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Logout;
