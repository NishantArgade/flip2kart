import { Avatar, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown.jsx";
import SideDrawer from "./SideDrawer.jsx";

const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <SideDrawer opened={opened} close={close} />

      <div className=" z-50 bg-white  shadow-md top-0 left-0 right-0 sticky overflow-hidden ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-3 lg:px-12 ">
          <div className=" md:hidden w-full text-2xl flex justify-between items-center px-2 mb-4">
            <div className="flex items-center gap-x-4">
              <GiHamburgerMenu onClick={open} size={25} />
              <Link to="/">
                <img
                  className="w-[6rem] md:w-24"
                  src="/flipkart-logo.png"
                  alt="brand"
                />
              </Link>
            </div>
            <div className="flex items-center gap-x-5 text-gray-500">
              <Link to="/profile">
                <Avatar src="avatar.png" alt="it's me" size={25} />
              </Link>
              <Link to="/cart" className="pr-1">
                <BsCart3 size={21} />
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center   md:gap-x-2 w-full  ">
            <div className="flex md:gap-x-4  w-full">
              <Link to="/">
                <img
                  className="w-16 md:w-24 hidden md:inline-block"
                  src="/flipkart-logo.png"
                  alt="brand"
                />
              </Link>

              <div className="flex items-center justify-start gap-x-1 mx-4  bg-[#F0F5FF] w-full lg:w-[38rem] px-2 py-1 rounded-md">
                <IoSearchOutline size={24} color="gray" />
                <input
                  className="outline-none w-full bg-[#F0F5FF] text-sm  py-0.5"
                  placeholder="Search for Products, Brands and More"
                  type="text"
                  name="search"
                />
              </div>
            </div>

            <div className="lg:flex lg:justify-between lg:items-center lg:gap-x-8 hidden md:flex">
              <AvatarDropdown />

              <Link
                to="/cart"
                className="flex justify-center items-center gap-x-1 cursor-pointer"
              >
                <span>
                  <BsCart3 />
                </span>
                <span className="text-sm  md:hidden lg:inline-block">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
