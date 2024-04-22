import { useAppSelector } from "@/hooks";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;
const AuthLayout = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [user, navigate]);
  return <div>{children}</div>;
};
export default AuthLayout;
