import { Link } from "react-router-dom"
import DeleteConfirmModal from "./DeleteConfirmModal"
import { calculateDiscountedPrice } from "../utils/helper"
import moment from "moment"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { updateAddToCartProduct } from "../api/cartApi"
import { queryClient } from "../main"
import { toast } from "../utils/toast"

const CartProductCard = ({
  product,
  quantity,
  removeProductIsPending,
  removeProductMutate,
  updateAddToProductMutate,
  updateAddToCartIsPending,
}) => {
  const [qty, setQty] = useState(quantity)

  function getDiliveryStatusText(day) {
    if (day >= 2) return moment().add(day, "days").format("ddd MMM DD")

    let date = moment().add(day, "days") // tomorrow's date

    let formattedDate = date.calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow], ddd",
    })

    return formattedDate
  }

  function onClickQtyDecrease() {
    let newQty = qty

    if (qty > 1) {
      newQty = qty - 1
    } else {
      return (newQty = 1)
    }
    setQty(newQty)
    updateAddToProductMutate({ product: product?._id, quantity: newQty })
  }

  function onClickQtyIncrease() {
    setQty((prev) => (prev < 10 ? prev + 1 : prev))
    let newQty = qty

    if (qty < 10) {
      newQty = qty + 1
    } else {
      newQty = qty
      return toast.success("We're sorry! Only 10 unit(s) allowed in each order")
    }
    setQty(newQty)
    updateAddToProductMutate({ product: product?._id, quantity: newQty })
  }

  return (
    <div className="flex flex-col items-start justify-start gap-y-2 border-b-[1.5px] bg-white py-4">
      <div className="flex w-full flex-col items-start justify-between px-2 md:flex-row">
        {/* Product Image And Info Block */}
        <div className="flex items-start justify-start gap-x-3">
          <Link
            to={`/product-detail/${product?._id}`}
            className="h-24 w-24 cursor-pointer p-1 "
          >
            <img
              src={product?.images?.length > 0 && product?.images[0].url}
              alt=""
              className="h-full w-full object-contain"
            />
          </Link>
          <div className="max-w-[26rem] text-sm">
            <Link
              to={`/product-detail/${product?._id}`}
              className="line-clamp-1 cursor-pointer hover:text-blue-500"
            >
              {product?.name}
            </Link>

            <p className="my-3 flex flex-col items-start justify-start gap-x-2  text-xs text-gray-500 md:flex-row md:items-center">
              <p>
                <span>Seller: </span>
                {product?.seller}
              </p>
              <img src="/assured.png" className="mt-1 w-12 md:mt-0" alt="" />
            </p>

            <p className="mt-1 text-xs">
              <span className="mr-2 text-[1rem] font-bold">
                ₹
                {calculateDiscountedPrice(
                  product?.price,
                  product?.discount,
                  qty
                )}
              </span>
              <strike className="mr-2 text-gray-700">
                ₹{product?.price * qty}
              </strike>
              <span className="text-green-600 ">{product?.discount}% off</span>
            </p>
          </div>
        </div>

        {/* Delivery By Text Block*/}
        <p className="ml-4 flex items-center gap-1 self-center pl-9 pt-2 text-xs md:ml-0 md:self-start md:p-0 ">
          Delivery by {getDiliveryStatusText(product?.delivery_estimate_days)}
          <div>
            <span> | </span>
            <span className="mx-1 font-medium text-green-600">Free</span>
            <span className="text-gray-500 line-through">
              ₹{(product?.price <= 2000 ? 40 : 70) * qty}
            </span>
          </div>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-start gap-x-6 px-4 text-sm ">
        {/** Qty Inc & Dec Block */}
        <div
          className={`${updateAddToCartIsPending ? "opacity-50" : ""} flex items-center justify-start gap-x-2 `}
        >
          <button
            className={`${qty <= 1 ? "text-gray-500 opacity-50" : ""} w-6 rounded-full border-2 px-2   shadow-sm`}
            onClick={onClickQtyDecrease}
            disabled={updateAddToCartIsPending || qty <= 1}
          >
            -
          </button>
          <input
            type="text"
            className="w-10 border-2 px-1 py-[3px] text-center text-xs outline-none"
            value={qty}
            disabled={updateAddToCartIsPending}
          />
          <button
            className={`w-6 rounded-full border-2 px-1  shadow-sm`}
            onClick={onClickQtyIncrease}
            disabled={updateAddToCartIsPending}
          >
            +
          </button>
        </div>
        {/** Remove Button */}
        <DeleteConfirmModal
          removeProductIsPending={removeProductIsPending}
          removeProductMutate={removeProductMutate}
          productID={product?._id}
        >
          <button className="font-medium  hover:text-blue-500">REMOVE</button>
        </DeleteConfirmModal>
      </div>
    </div>
  )
}

export default CartProductCard
