import React from "react"
import { IoSearchOutline } from "react-icons/io5"

const TableSearchBar = ({ globalFilter, setGlobalFilter, placeholder }) => {
  return (
    <div className="flex w-[35rem] items-center rounded-md  bg-[#F0F5FF] text-sm hover:shadow-md  ">
      <input
        className="h-full w-full  rounded-md  bg-[#F0F5FF] px-2 outline-none "
        placeholder={placeholder}
        type="text"
        name="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className="flex  h-full  w-10  cursor-pointer items-center  justify-center gap-x-1 rounded-md bg-blue-50 py-2  text-xs text-gray-500">
        <IoSearchOutline size={20} />
      </div>
    </div>
  )
}

export default TableSearchBar
