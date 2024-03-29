import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllMyAddresses } from "../../api/addressApi"
import CartProductCard from "../../components/CartProductCard"
import ChangeAddressModal from "./components/ChangeAddressModal"
import { useEffect, useState } from "react"
import { getAddressString } from "../../utils/helper"
import {
  removeProductFromCart,
  updateAddToCartProduct,
} from "../../api/cartApi"
import { queryClient } from "../../main"
import { toast } from "../../utils/toast"

const ProductList = ({ cartData, isFreeDelivery }) => {
  const [activeAddress, setActiveAddress] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ["allMyAddresses"],
    queryFn: getAllMyAddresses,
  })

  const { mutate: removeProductMutate, isPending: removeProductIsPending } =
    useMutation({
      mutationKey: "removeProductFromCart",
      mutationFn: removeProductFromCart,
      onSuccess: (data) => {
        queryClient.invalidateQueries("cartProducts")
        toast.success(
          `Successfully removed '${data.removedProduct.name.length > 65 ? data.removedProduct.name.slice(0, 65) + " ..." : data.removedProduct.name}' from your cart`
        )
      },

      onSettled: () => {
        close()
      },
    })

  const {
    mutate: updateAddToProductMutate,
    isPending: updateAddToCartIsPending,
  } = useMutation({
    mutationKey: "updateAddToCartProduct",
    mutationFn: updateAddToCartProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries("cartProducts")
      toast.success(
        `You've changed '${data?.updatedProduct.product.name.length > 65 ? data?.updatedProduct.product.name.slice(0, 65) + "..." : data?.updatedProduct.product.name}' QUANTITY to '${data?.updatedProduct.quantity}'`
      )
    },
  })

  useEffect(() => {
    data?.addresses.map((item, i) => {
      if (item.is_active) setActiveAddress(item)
    })
  }, [data?.addresses])

  return (
    <>
      {/* Address */}
      {Object.keys(activeAddress).length > 0 && !isLoading && (
        <div className="mb-2 flex items-center justify-between  bg-white px-2 py-3 text-xs shadow-md">
          <div className="flex flex-col items-start justify-center gap-y-1">
            <div className="flex items-center justify-start">
              <p>Deliver to: </p>
              <p className="ml-1 font-semibold"> {activeAddress?.user_name}</p>
            </div>
            <p className="text-gray-500">{getAddressString(activeAddress)}</p>
          </div>
          <ChangeAddressModal data={data}>
            <span>Change</span>
          </ChangeAddressModal>
        </div>
      )}

      {/* All Add to Cart Products list */}
      <div className="shadow-md">
        {cartData.map((c) => (
          <CartProductCard
            key={c.product._id}
            product={c.product}
            quantity={c.quantity}
            removeProductIsPending={removeProductIsPending}
            removeProductMutate={removeProductMutate}
            updateAddToProductMutate={updateAddToProductMutate}
            updateAddToCartIsPending={updateAddToCartIsPending}
            isFreeDelivery={isFreeDelivery}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList
