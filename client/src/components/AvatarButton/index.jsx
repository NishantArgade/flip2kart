import { Avatar } from "@mantine/core"
import { RxAvatar } from "react-icons/rx"
import { Link } from "react-router-dom"

import {
  adminNavLinks,
  unAuthUserNavLinks,
  userNavLinks,
} from "../../utils/navLinkMenuData"
import DropdownList from "./DropdownList"

export default function AvatarButton({ isLoggedIn, isAdmin }) {
  const getNavlinks = () => {
    if (!isLoggedIn) return unAuthUserNavLinks()
    if (isLoggedIn && isAdmin) return adminNavLinks()
    else if (isLoggedIn && !isAdmin) return userNavLinks()
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
    <DropdownList
      navLinks={getNavlinks()}
      TargetButton={getTargetButton()}
      isLoggedIn={isLoggedIn}
    />
  )
}
