import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAppDispatch } from "@/reduxHooks";
import { loginUser } from "@/store/slices/userSlice";
import useRedirectPath from "@/hooks/useRedirectPath";
import { Link } from "react-router-dom";
const initialFieldState = {
  username: "test",
  email: "test07@gmail.com",
  password: "123456",
};
function LoginPage() {
  const [fields, setFields] = useState(initialFieldState);
  const dispatch = useAppDispatch();
  const redirect = useRedirectPath();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(fields);
    await dispatch(loginUser(fields));
  }
  return (
    <section className="w-full lg:grid lg:grid-cols-2  h-screen">
      <form
        className="flex h-full items-center justify-center py-12 bg-primary_gray text-white"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="text-black"
                required
                onChange={handleChange}
                value={fields.username}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="text-black"
                required
                onChange={handleChange}
                value={fields.email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="text-black"
                required
                onChange={handleChange}
                value={fields.password}
              />
            </div>
            <Button type="submit" className="w-full bg-primary_orange">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/register?redirect=" + redirect} className="underline">
              Register
            </Link>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
}
export default LoginPage;
