import { Avatar, Button, Menu, Text, rem } from "@mantine/core";
import { useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import {
  MdFavoriteBorder,
  MdOutlineLogout,
  MdOutlineSell,
} from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

export default function AvatarDropdown() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleLogout() {
    // clear cookies and user data from localstorage
    // navigate to home page
    navigate("/", { replace: true });
  }

  return (
    <Menu
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
      shadow="md"
      width={isLoggedIn ? 150 : 200}
    >
      <Menu.Target>
        {isLoggedIn ? (
          <Link
            to="/profile"
            className="flex justify-center items-center gap-x-1 cursor-pointer px-3 py-1 hover:bg-gray-100 rounded-md"
          >
            <Avatar src="avatar.png" alt="it's me" size={26} />
            <span className="text-sm md:hidden lg:inline-block">Nishant</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex justify-center items-center gap-x-1 cursor-pointer px-3 py-2 hover:bg-[#2874F0] hover:text-white rounded-md"
          >
            <IoMdLogIn
              src="avatar.png"
              alt="it's me"
              size={26}
              className="text-gray-600"
            />
            <span className="text-sm">Login</span>
          </Link>
        )}
      </Menu.Target>

      {isLoggedIn ? (
        <Menu.Dropdown>
          <Link to="/profile">
            <Menu.Item
              className="hover:bg-gray-50"
              leftSection={<RxAvatar size={20} />}
            >
              My Profile
            </Menu.Item>
          </Link>
          <Link to="/profile/orders">
            <Menu.Item
              className="hover:bg-gray-50"
              leftSection={<BsBoxSeam size={16} />}
            >
              Orders
            </Menu.Item>
          </Link>
          <Link to="/profile/wishlist">
            <Menu.Item
              className="hover:bg-gray-50"
              leftSection={<MdFavoriteBorder size={20} />}
            >
              Wishlist
            </Menu.Item>
          </Link>
          <Menu.Item
            className="hover:bg-gray-50"
            leftSection={<MdOutlineLogout size={20} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown>
          {/* <Menu.Item className="hover:bg-gray-50"> */}
          <div className="flex justify-between items-center border-b-2  border-gray-200  px-3 py-1 mb-2">
            <span className="text-xs">New Customer? </span>
            <Link
              to="/register"
              className="text-xs text-[#2874F0] font-semibold cursor-pointer"
            >
              <Menu.Item className="text-xs text-[#2874F0]">SignUp</Menu.Item>
            </Link>
          </div>
          {/* </Menu.Item> */}
          <Link to="/trending-products">
            <Menu.Item
              className="hover:bg-gray-50"
              leftSection={<BsBoxSeam size={20} />}
            >
              Trending Products
            </Menu.Item>{" "}
          </Link>
          <Link to="/all-products">
            <Menu.Item
              className="hover:bg-gray-50"
              leftSection={<MdFavoriteBorder size={20} />}
            >
              All Products
            </Menu.Item>{" "}
          </Link>
          <Link to="/sell">
            <Menu.Item
              className="hover:bg-gray-50"
              leftSection={<MdOutlineSell size={20} />}
            >
              Sell
            </Menu.Item>
          </Link>
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
