import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const MyOrderSearchBar = () => {
  return (
    <div className="w-[45rem] hover:shadow-md flex bg-[#F0F5FF]  rounded-sm items-center text-sm  ">
      <input
        className="outline-none bg-[#F0F5FF] w-full h-full px-2"
        placeholder="Search your order here"
        type="text"
        name="search"
      />
      <div className="flex  items-center justify-start gap-x-2 bg-blue-600 text-white text-xs px-4 py-2">
        <IoSearchOutline size={20} />
        <p className="hidden md:block w-20">Search Order</p>
      </div>
    </div>
  );
};

export default MyOrderSearchBar;
