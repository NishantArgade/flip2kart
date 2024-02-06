import { Avatar } from "@mantine/core"
import { RxAvatar } from "react-icons/rx"
import { Link } from "react-router-dom"
import {
  getAdminNavLinkMenuItems,
  getUnAuthUserNavLinkMenuItems,
  getUserNavLinkMenuItems,
} from "../../Utils/navLinkMenuData"
import ProfileMenuDropdown from "./ProfileMenuDropdown"

export default function ProfileMenuButton({ isLoggedIn, isAdmin }) {
  const getNavlinks = () => {
    if (!isLoggedIn) return getUnAuthUserNavLinkMenuItems()
    if (isLoggedIn && isAdmin) return getAdminNavLinkMenuItems()
    else if (isLoggedIn && !isAdmin) return getUserNavLinkMenuItems()
    else return []
  }
  const getTargetButton = () => {
    if (!isLoggedIn)
      return (
        <Link
          to={"/login"}
          className="flex cursor-pointer items-center justify-center gap-x-1  rounded-md px-2 py-1 hover:bg-blue-500 hover:text-white"
        >
          <RxAvatar size={26} />
          <span className="text-sm md:hidden lg:inline-block ">Login</span>
        </Link>
      )
    else
      return (
        <div className="flex cursor-pointer items-center justify-center gap-x-1  rounded-md px-2 py-1 hover:bg-gray-100">
          <Avatar src="avatar.png" alt="it's me" size={26} />
          <span className="text-sm md:hidden lg:inline-block ">Nishant</span>
        </div>
      )
  }
  return (
    <ProfileMenuDropdown
      navLinks={getNavlinks()}
      TargetButton={getTargetButton()}
      isLoggedIn={isLoggedIn}
    />
  )
}
