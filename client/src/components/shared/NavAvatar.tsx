import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "../layout/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks";

const NavAvatar = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className=" cursor-pointer">
          <AvatarImage src={user.userData?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" mr-10 mt-2 p-2 ">
        <DropdownMenuLabel>{user.userData?.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <Link to="/upload-video">
          <DropdownMenuItem>Upload Video</DropdownMenuItem>
        </Link>
        <Logout className="w-full h-full m-0">
          <DropdownMenuItem className="  ">
            <div>Logout</div>
          </DropdownMenuItem>
        </Logout>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavAvatar;
