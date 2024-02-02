import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const TableSearchBar = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="w-[35rem] hover:shadow-md flex bg-[#F0F5FF]  rounded-md items-center text-sm  ">
      <input
        className="outline-none bg-[#F0F5FF]  rounded-md  w-full h-full px-2 "
        placeholder="Search Product"
        type="text"
        name="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className="flex  rounded-md  py-2  items-center w-10  justify-center gap-x-1 bg-blue-50 text-gray-500 text-xs  h-full cursor-pointer">
        <IoSearchOutline size={20} />
      </div>
    </div>
  );
};

export default TableSearchBar;
