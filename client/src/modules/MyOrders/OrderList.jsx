import React from "react"
import { LuSettings2 } from "react-icons/lu"
import ProductCard from "./components/ProductCard"
import SearchBar from "./components/SearchBar"
import Skeleton from "react-loading-skeleton"

const OrderList = ({ setIsOpenSidebar, orders, isLoading }) => {
  console.log(orders)

  if (orders?.length === 0)
    return (
      <div className="flex h-80 items-center justify-center">
        <h1 className="text-2xl text-gray-300">No Orders Found</h1>
      </div>
    )

  return (
    <div>
      {/** SearchBar */}
      <div className="mb-4 mt-2 flex  justify-start border-b-2 px-4 pb-4 md:px-4">
        <SearchBar />
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
          ? orders.map((order) =>
              order?.products?.map((product) => (
                <ProductCard
                  key={product?.id}
                  product={product}
                  orderID={order._id}
                />
              ))
            )
          : Array.from({ length: 3 }).map((item, i) => (
              <div className="shadow-m  my-8 h-24 border-2 p-4" key={i}>
                <Skeleton className="my-2" height={16} />
                <Skeleton className="my-2" width={800} height={16} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default OrderList
