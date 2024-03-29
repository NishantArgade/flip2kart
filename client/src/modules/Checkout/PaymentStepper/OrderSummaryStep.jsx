import { useMutation } from "@tanstack/react-query"
import {
  removeProductFromCart,
  updateAddToCartProduct,
} from "../../../api/cartApi"
import CartProductCard from "../../../components/CartProductCard"
import { queryClient } from "../../../main"
import { toast } from "../../../utils/toast"
import { calculateDiscountAmount } from "../../../utils/helper"
import { Navigate } from "react-router-dom"

const OrderSummaryStep = ({
  nextStep,
  cart,
  setPaymentData,
  hasSearchParam,
}) => {
  const { mutate: removeProductMutate, isPending: removeProductIsPending } =
    useMutation({
      mutationKey: "removeProductFromCart",
      mutationFn: removeProductFromCart,
      onSuccess: (data) => {
        console.log(data)
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

  function handleClickContinue() {
    let totalQuantity = 0
    const products = cart.map((c) => {
      const discount = calculateDiscountAmount(
        c.product.price,
        c.product.discount
      )
      totalQuantity += c.quantity
      return {
        product_id: c.product._id,
        name: c.product.name,
        description: c.product.description,
        category: c.product.category,
        images: c.product.images,
        price: c.product.price,
        quantity: c.quantity,
        discount: discount,
        afterDiscountTotalPrice: (c.product.price - discount) * c.quantity,
        seller: c.product.seller,
        seller_address: c.product.seller_address,
        delivery_estimate_days: c.product.delivery_estimate_days,
      }
    })

    setPaymentData((prev) => ({
      ...prev,
      products,
      totalQuantity,
    }))
    nextStep()
  }

  if (cart?.length === 0) return <Navigate to="/" />

  return (
    <div>
      <div className="border-t-[1px]">
        {cart.map((c) => (
          <CartProductCard
            key={c.product._id}
            product={c.product}
            quantity={c.quantity}
            removeProductIsPending={removeProductIsPending}
            removeProductMutate={removeProductMutate}
            updateAddToProductMutate={updateAddToProductMutate}
            updateAddToCartIsPending={updateAddToCartIsPending}
            hasSearchParam={hasSearchParam}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10   py-3  text-white shadow-md"
          size="xs"
          onClick={handleClickContinue}
        >
          CONTINUE
        </button>
      </div>
    </div>
  )
}

export default OrderSummaryStep
