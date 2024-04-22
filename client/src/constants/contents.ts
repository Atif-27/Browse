import { BiHomeAlt } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { MdUnsubscribe } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { GrChannel } from "react-icons/gr";
import { RiPlayListAddFill } from "react-icons/ri";
import { IconType } from "react-icons";

interface SidebarContent {
  title: string;
  path: string;
  icon: IconType;
}

export const getSidebarContents = (channelId: string): SidebarContent[] => {
  const sidebarContents: SidebarContent[] = [
    {
      title: "Home",
      path: "/",
      icon: BiHomeAlt,
    },
    {
      title: "Liked Videos",
      path: "/playlist/liked-videos",
      icon: AiFillLike,
    },
    {
      title: "Subscriptions",
      path: "/subscriptions",
      icon: MdUnsubscribe,
    },
    {
      title: "History",
      path: "/playlist/history",
      icon: RiHistoryFill,
    },
    {
      title: "My Channel",
      path: `/channel/${channelId}/videos`,
      icon: GrChannel,
    },
    {
      title: "My Playlists",
      path: "/playlist",
      icon: RiPlayListAddFill,
    },
  ];
  return sidebarContents;
};
