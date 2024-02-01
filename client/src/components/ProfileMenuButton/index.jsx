import { Avatar } from "@mantine/core";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  getAdminNavLinkMenuItems,
  getUnAuthUserNavLinkMenuItems,
  getUserNavLinkMenuItems,
} from "../../Utils/navLinkMenuData";
import ProfileMenuDropdown from "./ProfileMenuDropdown";

export default function ProfileMenuButton({ isLoggedIn, isAdmin }) {
  const getNavlinks = () => {
    if (!isLoggedIn) return getUnAuthUserNavLinkMenuItems();
    if (isLoggedIn && isAdmin) return getAdminNavLinkMenuItems();
    else if (isLoggedIn && !isAdmin) return getUserNavLinkMenuItems();
    else return [];
  };
  const getTargetButton = () => {
    if (!isLoggedIn)
      return (
        <Link
          to={"/login"}
          className="flex justify-center items-center gap-x-1 cursor-pointer  py-1 hover:bg-blue-500 hover:text-white rounded-md px-2"
        >
          <RxAvatar size={26} />
          <span className="text-sm md:hidden lg:inline-block ">Login</span>
        </Link>
      );
    else
      return (
        <Link
          to={`${isLoggedIn && isAdmin ? "/admin-dashboard" : "/dashboard"}`}
          className="flex justify-center items-center gap-x-1 cursor-pointer  py-1 hover:bg-gray-100 rounded-md px-2"
        >
          <Avatar src="avatar.png" alt="it's me" size={26} />
          <span className="text-sm md:hidden lg:inline-block ">Nishant</span>
        </Link>
      );
  };
  return (
    <ProfileMenuDropdown
      navLinks={getNavlinks()}
      TargetButton={getTargetButton()}
      isLoggedIn={isLoggedIn}
    />
  );
}
