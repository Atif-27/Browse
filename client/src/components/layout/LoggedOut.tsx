import { useAppSelector } from "@/hooks";
import { useState, useEffect } from "react";

const LoggedOut = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector((state) => state.user);
  const [show, setShow] = useState(user.isLoggedIn || false);
  useEffect(() => {
    setShow(user.isLoggedIn);
  }, [user.isLoggedIn]);
  if (!show) {
    return <>{children}</>;
  }
  return null;
};

export default LoggedOut;
