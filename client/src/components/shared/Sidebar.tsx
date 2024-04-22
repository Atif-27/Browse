import { getSidebarContents } from "@/constants/contents";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppSelector } from "@/hooks";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user?.userData);
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <>
      <section className=" max-w-[15rem] bg-primary_gray max-md:hidden pt-4">
        <div className=" py-5   flex justify-between  h-full flex-col">
          <div>
            {getSidebarContents(user?._id as string).map((content, index) => {
              return (
                <Link to={content.path} key={index}>
                  <div
                    className={`p-3 hover:bg-secondary_gray text-white hover:text-primary_orange px-8 flex gap-4 ${
                      isActive(content.path) &&
                      "bg-secondary_gray text-primary_orange"
                    }`}
                  >
                    <div>
                      {content.icon && <content.icon className="w-6 h-6" />}
                    </div>
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
      <section className="hidden max-md:flex justify-between py-8  px-10">
        {getSidebarContents(user?._id as string).map((content, index) => {
          return (
            <Link to={content.path} key={index}>
              <div
                className={` hover:bg-secondary_gray text-white hover:text-primary_orange  ${
                  isActive(content.path) &&
                  "bg-secondary_gray text-primary_orange"
                }`}
              >
                <h1 className=" text-lg">
                  {<content.icon className="w-6 h-6" />}
                </h1>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Sidebar;
