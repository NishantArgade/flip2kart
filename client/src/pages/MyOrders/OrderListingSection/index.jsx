import React from "react"
import { LuSettings2 } from "react-icons/lu"
import ProductCard from "./ProductCard"
import SearchBar from "./SearchBar"

const OrderListingSection = ({ setIsOpenSidebar, myOrders }) => {
  return (
    <div>
      {/** SearchBar */}
      <div className="mb-4 mt-2 flex  justify-start px-2 md:px-4">
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
        {myOrders.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default OrderListingSection
