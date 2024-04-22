import BrowseDark from "../.././../public/assets/browse_dark.png";
import BrowseLogo from "../.././../public/assets/browse_logo.png";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import LoggedIn from "../layout/LoggedIn";
import LoggedOut from "../layout/LoggedOut";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavAvatar from "./NavAvatar";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!search) return;
    navigate("/search?q=" + search);
  }
  return (
    <section className=" w-screen bg-primary_gray  p-8 py-5">
      <div className="flex  gap-20">
        <img src={BrowseDark} alt="" width={190} className="max-md:hidden" />
        <img src={BrowseLogo} alt="" width={40} className="md:hidden" />

        <div className="flex justify-between w-full flex-1">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Search"
              className=" max-w-md bg-secondary_gray border-gray-500 outline-none  text-white"
              value={search}
              onChange={handleChange}
            />
          </form>
          <div className="flex gap-10">
            <LoggedIn>
              <NavAvatar />
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
