import { useAppSelector } from "@/reduxHooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useRedirectPath() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const redirect = searchParams.get("redirect");
  useEffect(() => {
    if (user.isLoggedIn) {
      if (redirect) {
        navigate(redirect, { replace: true });
        return;
      }
      navigate("/", { replace: true });
    }
  }, [user.isLoggedIn, redirect, navigate]);
  return redirect;
}
