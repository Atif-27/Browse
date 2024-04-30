import { getSidebarContents } from "@/constants/contents";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "@/reduxHooks";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user?.userData);
  const location = useLocation();

  return (
    <>
      <section className="max-w-[15rem] bg-primary_gray max-md:hidden pt-4">
        <div className="py-5 flex justify-between h-full flex-col">
          <div>
            {getSidebarContents(user?._id as string).map((content, index) => {
              const isActive = location.pathname === content.path;
              return (
                <NavLink
                  to={content.path}
                  key={index}
                  className={`p-3 hover:bg-secondary_gray  hover:text-primary_orange px-8 flex gap-4 ${
                    isActive && "bg-secondary_gray text-primary_orange"
                  } `}
                >
                  {content.icon && <content.icon className="w-6 h-6" />}
                  <h1 className="text-lg">{content.title}</h1>
                </NavLink>
              );
            })}
          </div>
          <div className="w-full flex flex-col gap-5"></div>
        </div>
      </section>
      <section className="hidden max-md:flex justify-between py-8 px-10">
        {getSidebarContents(user?._id as string).map((content, index) => {
          const isActive = location.pathname === content.path;

          return (
            <NavLink
              to={content.path}
              key={index}
              className={`p-3 hover:bg-secondary_gray  hover:text-primary_orange px-8 flex gap-4 ${
                isActive && "bg-secondary_gray text-primary_orange"
              } `}
            >
              {content.icon && <content.icon className="w-6 h-6" />}
            </NavLink>
          );
        })}
      </section>
    </>
  );
};

export default Sidebar;
