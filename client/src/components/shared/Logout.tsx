import { useAppDispatch } from "@/hooks";
import { logoutUser } from "@/store/slices/userSlice";

const Logout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(logoutUser());
  }
  return (
    <div className="w-fit h-fit" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Logout;
