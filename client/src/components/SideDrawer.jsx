import { Avatar, Drawer, Menu } from "@mantine/core";
import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { MdFavoriteBorder, MdOutlineLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const SideDrawer = ({ opened, close }) => {
  return (
    <Drawer opened={opened} size="xs" onClose={close}>
      <div className="flex justify-between items-center w-full px-2 py-5  border-b-2 border-gray-300 shadow-md mb-3 bg-gray-50 rounded-sm">
        <div className="flex justify-center items-center gap-x-3 ">
          <Link to="/profile" onClick={close}>
            <Avatar />
          </Link>

          <Link to="/profile" onClick={close} className="text-gray-500">
            Nishant Argade
          </Link>
        </div>
        <span>
          <img src="/flipkart-icon.svg" className="w-8 h-8 rounded-full" />
        </span>
      </div>
      <div className="text-base text-gray-600">
        <Link
          to="/profile"
          onClick={close}
          className="hover:bg-[#F5FAFF] flex items-center gap-x-3  px-3 py-3 border-b-[1.5px] border-gray-300 rounded-sm"
        >
          <div>
            <RxAvatar size={25} />
          </div>
          <div>My Profile</div>
        </Link>
        <Link
          to="/profile/orders"
          onClick={close}
          className="hover:bg-[#F5FAFF] flex items-center gap-x-3  px-3 py-3 border-b-[1.5px] border-gray-300 rounded-sm"
        >
          <div>
            {" "}
            <BsBoxSeam size={21} />
          </div>
          <div>My Orders</div>
        </Link>
        <Link
          to="/profile/wishlist"
          onClick={close}
          className="hover:bg-[#F5FAFF] flex items-center gap-x-3  px-3 py-3 border-b-[1.5px] border-gray-300 rounded-sm"
        >
          <div>
            {" "}
            <MdFavoriteBorder size={25} />
          </div>
          <div>My Wishlist</div>
        </Link>
        <Link
          to="/"
          onClick={close}
          className="hover:bg-[#F5FAFF] flex items-center gap-x-3  px-3 py-3 border-b-[1.5px] border-gray-300 rounded-sm"
        >
          <div>
            <MdOutlineLogout size={25} />
          </div>
          <div>My Profile</div>
        </Link>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
