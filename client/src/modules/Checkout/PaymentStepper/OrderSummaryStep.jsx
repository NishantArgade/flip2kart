import { useMutation } from "@tanstack/react-query"
import {
  removeProductFromCart,
  updateAddToCartProduct,
} from "../../../api/cartApi"
import CartProductCard from "../../../components/CartProductCard"
import Spinner from "../../../components/Spinner"
import { queryClient } from "../../../main"
import { toast } from "../../../utils/toast"

const OrderSummaryStep = ({ nextStep, cart }) => {
  const { mutate: removeProductMutate, isPending: removeProductIsPending } =
    useMutation({
      mutationKey: "removeProductFromCart",
      mutationFn: removeProductFromCart,
      onSuccess: (data) => {
        queryClient.invalidateQueries("cartProducts")
        toast.success(
          `Successfully removed '${data.removedProduct.length > 65 ? data.removedProduct.slice(0, 65) + " ..." : data.removedProduct}' from your cart`
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
          />
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="mt-2 w-fit cursor-pointer self-end bg-[#FB641B] px-10   py-3  text-white shadow-md"
          size="xs"
          onClick={nextStep}
        >
          CONTINUE
        </button>
      </div>
    </div>
  )
}

export default OrderSummaryStep
