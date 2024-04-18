import { sidebarContents } from "@/constants/contents";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <section className=" max-w-[15rem] bg-primary_gray h-full  ">
      <div className=" py-5   flex justify-between  h-full flex-col">
        <div>
          {sidebarContents.map((content, index) => {
            return (
              <Link to={content.path} key={index}>
                <div className="p-3 hover:bg-secondary_gray text-white hover:text-primary_orange pl-14  ">
                  <h1 className=" text-lg">{content.title}</h1>
                </div>
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
