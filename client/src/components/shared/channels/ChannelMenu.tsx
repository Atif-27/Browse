import { Link, useLocation } from "react-router-dom";
const ChannelMenuItems = [
  {
    name: "Videos",
    path: "/videos",
  },
  {
    name: "Playlists",
    path: "/playlists",
  },
  {
    name: "Subscribers",
    path: "/subscribed",
  },
];
const ChannelMenu = () => {
  const location = useLocation();
  const path = location.pathname;
  const slicedPath = path.slice(0, path.lastIndexOf("/"));
  return (
    <div className="grid grid-cols-3 justify-center   items-center text-center   mt-10 ">
      {ChannelMenuItems.map((item, index) => {
        return (
          <Link
            to={slicedPath + item.path}
            key={index}
            className={`text-white text-lg border-b-2 border-gray-500 pb-4 w-full cursor-pointer hover:text-primary_orange hover:bg-primary_gray pt-4 ${
              location.pathname.endsWith(item.path)
                ? "border-b-2 border-primary_orange"
                : ""
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ChannelMenu;
