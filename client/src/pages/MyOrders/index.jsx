import { useState } from "react"
import { BsFilterCircleFill } from "react-icons/bs"
import { LuSettings2 } from "react-icons/lu"
import { MdOutlineNavigateNext } from "react-icons/md"
import { Link, NavLink } from "react-router-dom"
import FilterSection from "./FilterSection"
import MyOrderSearchBar from "./MyOrderSearchBar"
import OrderProductCard from "./OrderProductCard"

const MyOrders = ({ isAdmin }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const myOrders = [
    {
      id: "123abc",
      name: "TV",
      description:
        "Stet accusam accusam takimata lorem clita. Elitr lorem diam et tempor sit lorem ea lorem ipsum, ea et ipsum et.",
      amount: 200,
      deliveredDate: new Date(),
    },
    {
      id: "11abc",
      name: "Shirt",
      description:
        "Stet accusam accusam takimata lorem clita. Elitr lorem diam et tempor sit lorem ea lorem ipsum, ea et ipsum et.",
      amount: 20,
      deliveredDate: new Date(),
    },
    {
      id: "22ABCD",
      name: "Laptop",
      description:
        "Stet accusam accusam takimata lorem clita. Elitr lorem diam et tempor sit lorem ea lorem ipsum, ea et ipsum et.",
      amount: 100,
      deliveredDate: new Date(),
    },
  ]
  return (
    <div>
      {/** Navigation path */}
      <div className="container mx-auto flex items-center justify-start gap-x-2 px-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-blue-600">
          HomeMy
        </Link>
        <MdOutlineNavigateNext />
        <Link
          to={`${isAdmin ? "/admin-dashboard" : "/dashboard"}`}
          className="hover:text-blue-600"
        >
          AccountMy
        </Link>
        <MdOutlineNavigateNext />
        <NavLink
          to="/my-orders"
          className={({ isActive }) =>
            isActive ? "text-blue-600 " : "hover:text-blue-600"
          }
        >
          Orders
        </NavLink>
      </div>

      <div className="mt-2 flex w-full items-center justify-end gap-2 px-2 md:hidden">
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => setIsOpenSidebar(true)}
        >
          <LuSettings2
            className="cursor-pointer text-gray-500 md:hidden"
            size={22}
          />
          <span>Filters</span>
        </button>
      </div>
      {/** Main Component*/}
      <div className="container mx-auto grid min-h-[30rem] grid-cols-12 gap-x-2 gap-y-2 p-2">
        {/* Filter Section */}
        <div className="md:col-span-4 lg:col-span-2">
          <div
            className={`${
              isOpenSidebar
                ? "translate-x-0"
                : "translate-x-full md:-translate-x-0"
            } fixed left-0 top-0 z-50 col-span-12 h-screen w-full rounded-md border-2 border-gray-200 bg-gray-100 transition-all duration-500 ease-in-out md:static  md:col-span-4 md:h-full md:w-full md:rounded-sm md:border-0 md:bg-none lg:col-span-2`}
          >
            <FilterSection setIsOpenSidebar={setIsOpenSidebar} />
          </div>
        </div>

        {/* Order Listing Section */}
        <div className="col-span-12 bg-white shadow-md   md:col-span-8  lg:col-span-10">
          <div className="mb-4 mt-2 flex justify-start px-4">
            {/** SearchBar */}
            <MyOrderSearchBar />
          </div>

          <div>
            {myOrders.map((product) => (
              <OrderProductCard key={product?.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrders
