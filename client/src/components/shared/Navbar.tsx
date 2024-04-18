import BrowseDark from "../.././../public/assets/browse_dark.png";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "./Logout";
import { Button } from "../ui/button";
import LoggedIn from "../layout/LoggedIn";
import LoggedOut from "../layout/LoggedOut";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className=" w-screen bg-primary_gray  p-8">
      <div className="flex  gap-20">
        <img src={BrowseDark} alt="" className=" w-48  " />

        <div className="flex justify-between w-full flex-1">
          <Input
            placeholder="Search"
            className=" max-w-md bg-secondary_gray border-gray-500 outline-none  text-white"
          />
          <div className="flex gap-10">
            <LoggedIn>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </LoggedIn>
            <LoggedIn>
              <Logout>
                <Button className="bg-red-500">Logout</Button>
              </Logout>
            </LoggedIn>
            <LoggedOut>
              <Button className="  bg-primary_orange">
                <Link to="/login" className="w-full h-full">
                  Login
                </Link>
              </Button>
            </LoggedOut>
            <LoggedOut>
              <Button className=" bg-transparent border-2  border-primary_orange">
                <Link to="/register" className="w-full h-full">
                  Register
                </Link>
              </Button>
            </LoggedOut>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
