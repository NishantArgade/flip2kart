import React from "react"
import { IoSearchOutline } from "react-icons/io5"

const SearchBar = () => {
  return (
    <div className="flex w-[45rem] items-center rounded-sm  bg-[#F0F5FF] text-sm hover:shadow-md  ">
      <input
        className="h-full w-full bg-[#F0F5FF] px-2 outline-none"
        placeholder="Search your order here"
        type="text"
        name="search"
      />
      <div className="flex  items-center justify-start gap-x-2 bg-blue-600 px-4 py-2 text-xs text-white">
        <IoSearchOutline size={20} />
        <p className="hidden w-20 md:block">Search Order</p>
      </div>
    </div>
  )
}

export default SearchBar
