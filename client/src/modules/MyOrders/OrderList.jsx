import React, { useState } from "react"
import { LuSettings2 } from "react-icons/lu"
import ProductCard from "./components/ProductCard"
import SearchBar from "./components/SearchBar"
import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router-dom"
import { queryClient } from "../../main"

const OrderList = ({
  setIsOpenSidebar,
  orders,
  isLoading,
  setSelectedOrderStatus,
  setSelectedOrderTime,
  setAccordionValue,
}) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  function handleGoToOrdersClick() {
    navigate("/my-orders")
    queryClient.invalidateQueries("filteredOrders")
    setSelectedOrderStatus([])
    setSelectedOrderTime([])
    setAccordionValue([])
    setSearchTerm("")
  }

  if (orders?.length === 0)
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-y-2">
        <img src="/searchNotFound.png" alt="" />
        <p className="mt-3 text-xl font-medium"> Sorry, no results found </p>
        <p className="text-gray-500">
          Edit search or go back to My Orders Page
        </p>
        <button
          onClick={handleGoToOrdersClick}
          className="mt-4 cursor-pointer rounded-sm bg-blue-500 px-5 py-1 text-sm text-white shadow-sm"
        >
          <span>Go to My Orders</span>
        </button>
      </div>
    )

  return (
    <div>
      {/** SearchBar */}
      <div className="mb-4 flex justify-start  border-b-2 px-4 pb-4 pt-2 md:px-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/** Filter Button */}
      <div className="mt-2 flex w-full items-center justify-end gap-2 px-2 md:hidden">
        <button
          className="flex items-center justify-center gap-1 text-sm text-gray-600"
          onClick={() => setIsOpenSidebar(true)}
        >
          <LuSettings2 className="cursor-pointer  md:hidden" size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div>
        {!isLoading
          ? orders?.map((order) =>
              order?.products?.map((product) => (
                <ProductCard
                  key={order._id + product._id}
                  product={product}
                  orderID={order._id}
                />
              ))
            )
          : Array.from({ length: 3 }).map((_, i) => (
              <div className="shadow-m   border-2 p-4" key={i}>
                <div className="flex w-full items-center gap-2">
                  <div>
                    <Skeleton className="my-2" height={80} width={80} />
                  </div>
                  <div className="w-full">
                    <Skeleton className="my-2" height={16} width="40%" />
                    <Skeleton className="my-2" width="100%" height={16} />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default OrderList
