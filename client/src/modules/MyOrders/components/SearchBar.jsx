import React, { useEffect } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { queryClient } from "../../../main"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  function handleSearchOrderClick() {
    const urlParams = new URLSearchParams(window.location.search)

    if (!searchTerm) urlParams.delete("search")
    else urlParams.set("search", searchTerm)

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname

    window.history.pushState({}, "", newUrl)
    queryClient.invalidateQueries("filteredOrders")
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search")
    setSearchTerm(search)
  }, [])

  function handleRemoveSearchClick() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("search")

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname
    window.history.pushState({}, "", newUrl)
    setSearchTerm("")
    queryClient.invalidateQueries("filteredOrders")
  }
  return (
    <div className="flex w-[45rem] items-center rounded-sm  bg-[#F0F5FF] text-sm hover:shadow-md  ">
      <input
        className="h-full w-full bg-[#F0F5FF] px-2 outline-none"
        placeholder="Search by product name or description"
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!!searchTerm && (
        <button
          onClick={handleRemoveSearchClick}
          className="pr-3 text-gray-500"
        >
          X
        </button>
      )}
      <button
        onClick={handleSearchOrderClick}
        className="flex  items-center justify-start gap-x-2 bg-blue-600 px-4 py-2 text-xs text-white"
      >
        <IoSearchOutline size={20} />
        <p className="hidden w-20 md:block">Search Order</p>
      </button>
    </div>
  )
}

export default SearchBar
