import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/reduxHooks";
import { registerUser } from "@/store/slices/userSlice";
import RegisterBackground from "@/assets/register_background.png";
import useRedirectPath from "@/hooks/useRedirectPath";
interface FieldsType {
  username: string;
  fullName: string;
  email: string;
  password: string;
  avatar: File;
  coverImage: File;
}
function RegisterPage() {
  const [fields, setFields] = useState<FieldsType>({
    username: "test",
    fullName: "test",
    email: "test223",
    password: "123456",
    avatar: new File([], ""),
    coverImage: new File([], ""),
  });

  const dispatch = useAppDispatch();
  const redirect = useRedirectPath();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files?.length) {
      const file = e.target.files[0];
      setFields({ ...fields, [e.target.id]: file });
      return;
    }
    setFields({ ...fields, [e.target.id]: e.target.value });
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(fields);
    dispatch(registerUser(fields));
  }
  return (
    <section className=" h-screen flex justify-center items-center relative bg-black bg-opacity-80">
      <img
        src={RegisterBackground}
        alt="register"
        className="absolute h-full inset-0 object-cover w-full
         bg-gradient-to-bl  from-light_orange via-primary_gray to-black
        "
      />
      <Card className="mx-auto max-w-xl bg-primary_gray text-white p-5 rounded-2xl border-black b-2  z-10">
        <CardHeader>
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="w-full h-44 bg-white relative">
                  {fields.coverImage.name ? (
                    <img
                      src={URL.createObjectURL(fields.coverImage)}
                      alt="cover"
                      className="w-full h-full object-cover "
                    />
                  ) : (
                    <p className="text-center text-black">Cover Image</p>
                  )}
                  <Input
                    id="coverImage"
                    type="file"
                    className="text-black absolute w-full h-full top-0 left-0 opacity-0"
                    accept="image/x-png,image/jpeg,application/pdf"
                    onChange={handleChange}
                  />
                  <div className=" absolute top-1/2  -translate-y-1/2 left-5">
                    <div className=" bg-white relative rounded-full w-20 h-20 border-black border-2 flex justify-center items-center">
                      {fields.avatar.name ? (
                        <img
                          src={URL.createObjectURL(fields.avatar)}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full  "
                        />
                      ) : (
                        <p className=" text-black">a</p>
                      )}
                      <Input
                        id="avatar"
                        type="file"
                        className="text-black absolute w-full h-full top-0 left-0 opacity-0"
                        accept="image/x-png,image/jpeg,application/pdf"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="atif27"
                    required
                    className="text-black"
                    onChange={handleChange}
                    value={fields.username}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    placeholder="Atif Ali"
                    required
                    className="text-black"
                    onChange={handleChange}
                    value={fields.fullName}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="atif@example.com"
                  className="text-black"
                  required
                  onChange={handleChange}
                  value={fields.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="text-black"
                  placeholder="Enter your password"
                  required
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full bg-primary_orange">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/login?redirect=" + redirect} className="underline">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default RegisterPage;
