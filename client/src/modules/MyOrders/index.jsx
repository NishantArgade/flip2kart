import { useEffect, useState } from "react"
import { MdOutlineNavigateNext } from "react-icons/md"
import { Link, NavLink, useNavigate } from "react-router-dom"
import FilterSection from "./FilterSection"
import OrderList from "./OrderList"
import { useQuery } from "@tanstack/react-query"
import { getFilteredOrders } from "../../api/orderApi"

const MyOrders = ({ isAdmin }) => {
  const navigate = useNavigate()
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [selectedOrderStatus, setSelectedOrderStatus] = useState([])
  const [selectedOrderTime, setSelectedOrderTime] = useState([])
  const [accordionValue, setAccordionValue] = useState([])

  const { data, isLoading } = useQuery({
    queryKey: ["filteredOrders", selectedOrderStatus, selectedOrderTime],
    queryFn: async () => await getFilteredOrders(window.location.search),
  })

  useEffect(() => {
    if (!isLoading && data) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }
  }, [data, isLoading])

  if (data?.showEmptyPage)
    return (
      <div className="container mx-auto mb-5 rounded-sm py-2 shadow-md">
        <div className="flex h-96 flex-col items-center justify-center gap-y-2 bg-white">
          <img src="/searchNotFound.png" alt="" />
          <p className="mt-3 text-xl font-medium">No Orders</p>
          <p className="text-gray-500">There is no order</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 cursor-pointer rounded-sm bg-blue-500 px-5 py-2 text-sm text-white shadow-sm"
          >
            <span> Continue shopping</span>
          </button>
        </div>
      </div>
    )

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
            selectedOrderStatus={selectedOrderStatus}
            setSelectedOrderStatus={setSelectedOrderStatus}
            selectedOrderTime={selectedOrderTime}
            setSelectedOrderTime={setSelectedOrderTime}
            accordionValue={accordionValue}
            setAccordionValue={setAccordionValue}
            isLoading={isLoading}
          />
        </section>

        {/* Order Listing Section */}
        <section className="col-span-12    md:col-span-8  lg:col-span-10">
          <div className="bg-white  shadow-md">
            <OrderList
              setIsOpenSidebar={setIsOpenSidebar}
              orders={data?.filteredOrders}
              isLoading={isLoading}
              setSelectedOrderStatus={setSelectedOrderStatus}
              setSelectedOrderTime={setSelectedOrderTime}
              setAccordionValue={setAccordionValue}
            />
          </div>
          {data?.filteredOrders.length > 0 && (
            <div className="flex items-center justify-center">
              <div className="mt-2 rounded-sm border-2 bg-white  text-blue-500">
                <p className="p-2 text-xs font-medium">
                  No More Results To Display
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default MyOrders
