import { useState } from "react"
import { MdOutlineNavigateNext } from "react-icons/md"
import { Link, NavLink } from "react-router-dom"
import FilterSection from "./FilterSection"
import OrderList from "./OrderList"
import { useQuery } from "@tanstack/react-query"
import { getAllMyOrders } from "../../api/orderApi"

const MyOrders = ({ isAdmin }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getAllMyOrders,
  })

  return (
    <div className="min-h-screen">
      {/** Navigation path */}
      <div className="container mx-auto flex items-center justify-start gap-x-2 px-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-blue-600">
          HomeMy
        </Link>
        <MdOutlineNavigateNext />
        <Link
          to={`${isAdmin ? "/admin-dashboard" : "/account"}`}
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
          <OrderList
            setIsOpenSidebar={setIsOpenSidebar}
            orders={data?.orders}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  )
}

export default MyOrders
