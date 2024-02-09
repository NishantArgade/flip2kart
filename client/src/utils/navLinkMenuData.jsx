import { BsBoxSeam, BsBoxes } from "react-icons/bs"
import { FaArrowTrendUp } from "react-icons/fa6"
import {
  MdFavoriteBorder,
  MdOutlineDashboard,
  MdOutlineLogout,
} from "react-icons/md"
import { RxAvatar } from "react-icons/rx"

export const adminNavLinks = () => [
  {
    icon: <MdOutlineDashboard size={24} />,
    name: "Admin Dashboard",
    link: "/admin-dashboard",
  },
  {
    icon: <RxAvatar size={24} />,
    name: "Profile",
    link: "/admin-dashboard/profile",
  },
  {
    icon: <BsBoxSeam className="mr-[0.2rem]" size={21} />,
    name: "All Transactions",
    link: "/admin-dashboard/transactions",
  },
  {
    icon: <MdOutlineLogout size={24} />,
    name: "Logout",
    link: "/login",
  },
]
export const userNavLinks = () => [
  {
    icon: <RxAvatar size={24} />,
    name: "Profile",
    link: "/dashboard",
  },
  {
    icon: <BsBoxSeam className="mr-[0.2rem]" size={21} />,
    name: "Orders",
    link: "/my-orders",
  },
  {
    icon: <MdFavoriteBorder size={24} />,
    name: "Wishlist",
    link: "dashboard/wishlist",
  },
  {
    icon: <MdOutlineLogout size={24} />,
    name: "Logout",
    link: "/login",
  },
]
export const unAuthUserNavLinks = () => [
  {
    icon: <BsBoxes size={24} />,
    name: "All Products",
    link: "/all-products",
  },
  {
    icon: <FaArrowTrendUp size={24} />,
    name: "Offer Zone",
    link: "/offerzone",
  },
]
