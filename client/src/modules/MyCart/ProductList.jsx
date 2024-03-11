import { useQuery } from "@tanstack/react-query"
import { getAllMyAddresses } from "../../api/addressApi"
import CartProductCard from "../../components/CartProductCard"
import ChangeAddressModal from "./components/ChangeAddressModal"
import { useEffect, useState } from "react"
import { getAddressString } from "../../utils/helper"

const ProductList = ({ cartData }) => {
  const [activeAddress, setActiveAddress] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ["allMyAddresses"],
    queryFn: getAllMyAddresses,
  })

  useEffect(() => {
    data?.addresses.map((item, i) => {
      if (item.is_active) setActiveAddress(item)
    })
  }, [data?.addresses])

  return (
    <>
      {/* Address */}
      {Object.keys(activeAddress).length > 0 && (
        <div className="mb-2 flex items-center justify-between  bg-white px-2 py-3 text-xs shadow-md">
          <div className="flex flex-col items-start justify-center gap-y-1">
            <div className="flex items-center justify-start">
              <p>Deliver to: </p>
              <p className="ml-1 font-semibold"> {activeAddress?.user_name}</p>
            </div>
            <p className="text-gray-500">{getAddressString(activeAddress)}</p>
          </div>
          <ChangeAddressModal data={data}>
            <button className="rounded-sm border-2 bg-white  px-4 py-2 font-semibold text-blue-500 shadow-sm  hover:shadow-md">
              Change
            </button>
          </ChangeAddressModal>
        </div>
      )}

      {/* All Add to Cart Products list */}
      <div className="shadow-md">
        {cartData.map((product) => (
          <CartProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default ProductList
