import { sidebarContents } from "@/constants/contents";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <section className=" max-w-[15rem] bg-black h-screen ">
      <div className=" py-5 px-5 flex justify-between  h-full flex-col">
        <div>
          {sidebarContents.map((content, index) => {
            return (
              <Link to={content.path} key={index} className="p-3 ">
                <h1 className="text-white text-lg">{content.title}</h1>
              </Link>
            );
          })}
        </div>
        <div className="w-full flex flex-col gap-5">
          <Button className="w-full">Log Out</Button>
          <Button className="w-full">Log Out</Button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
