import { useState } from "react"
import { BsFilterCircleFill } from "react-icons/bs"
import { LuSettings2 } from "react-icons/lu"
import { MdOutlineNavigateNext } from "react-icons/md"
import { Link, NavLink } from "react-router-dom"
import FilterSection from "./FilterSection"
import MyOrderSearchBar from "./OrderListingSection/SearchBar"
import OrderListingSection from "./OrderListingSection"
import OrderProductCard from "./OrderListingSection/ProductCard"

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
    <div className="min-h-screen">
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

      {/** Main Component*/}
      <div className="container mx-auto grid min-h-[30rem] grid-cols-12 gap-x-2 gap-y-2 p-2">
        {/* Filter Section */}
        <section className="md:col-span-4 lg:col-span-2">
          <FilterSection
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </section>

        {/* Order Listing Section */}
        <section className="col-span-12 bg-white shadow-md   md:col-span-8  lg:col-span-10">
          <OrderListingSection
            setIsOpenSidebar={setIsOpenSidebar}
            myOrders={myOrders}
          />
        </section>
      </div>
    </div>
  )
}

export default MyOrders
