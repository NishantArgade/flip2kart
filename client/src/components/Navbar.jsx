import React from "react";
import { BsCart3 } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown.jsx";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className=" container mx-auto flex justify-between items-center py-3 px-12">
        <div className="flex justify-center items-center gap-x-6">
          <Link to="/">
            <img className="w-24" src="/flipkart-logo.png" alt="brand" />
          </Link>

          <div className="flex items-center justify-start gap-x-1 bg-[#F0F5FF] w-[38rem] px-2 py-1 rounded-md">
            <IoSearchOutline size={24} color="gray" />
            <input
              className="outline-none w-full bg-[#F0F5FF] text-sm  py-0.5"
              placeholder="Search for Products, Brands and More"
              type="text"
              name="search"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-8 ">
          <AvatarDropdown />

          <Link
            to="/cart"
            className="flex justify-center items-center gap-x-1 cursor-pointer"
          >
            <span>
              <BsCart3 />
            </span>
            <span className="text-sm">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
