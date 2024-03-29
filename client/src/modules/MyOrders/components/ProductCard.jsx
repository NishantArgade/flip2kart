/* eslint-disable react/prop-types */
import moment from "moment"
import { IoMdStar } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import {
  CANCELLED,
  DELIVERED,
  ORDER_CONFIRMED,
  OUT_FOR_DELIVERY,
  RETURNED,
  SHIPPED,
} from "../../../utils/constants"

const ProductCard = ({ product, orderID }) => {
  const navigate = useNavigate()

  function getOrderStatusConfig() {
    switch (product?.latest_order_status?.status) {
      case ORDER_CONFIRMED:
        return {
          color: "bg-green-600",
          title: "Your order for this item has been confirmed",
        }
      case SHIPPED:
        return { color: "bg-green-600", title: "Your item has been shipped" }
      case OUT_FOR_DELIVERY:
        return {
          color: "bg-green-600",
          title: "Your item has been Out for delivery",
        }
      case DELIVERED:
        return { color: "bg-green-600", title: "Your item has been deliverd" }

      case CANCELLED:
        return {
          color: "bg-red-400",
          title:
            "You requested a cancellation because you changed your mind about this product.",
        }

      case RETURNED:
        return {
          color: "bg-orange-400",
          title:
            "You returned this order because you were not satisfied with the product.",
        }
    }
  }

  return (
    <Link
      to={`/order-detail?order=${orderID}&product=${product?.product_id}`}
      key={product?.product_id}
      className="grid grid-cols-12 gap-y-2 border-b-[1.5px] px-4 py-5  hover:shadow-md "
    >
      <div className="col-span-12 flex w-full gap-4 md:col-span-6">
        <div className="h-24 w-24 cursor-pointer rounded-sm border border-gray-200 p-1">
          <img
            src={product?.images[0]?.url}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        <div className="w-full text-sm">
          <p className="line-clamp-1 cursor-pointer text-gray-800">
            {product?.name}
          </p>
          <p className="line-clamp-2 cursor-pointer text-xs text-gray-500">
            {product?.description}
          </p>
        </div>
      </div>
      <div className="col-span-2 mb-2 text-center  text-sm md:col-span-2 md:mb-0">
        ₹{product?.price - product?.discount}
      </div>
      <div className="col-span-12 md:col-span-4 ">
        <div className="flex items-center  justify-start gap-x-2">
          <div
            className={`${getOrderStatusConfig()?.color} h-2 w-2 rounded-full`}
          >
            {" "}
          </div>
          <p className="text-xs md:text-sm">{`${product?.latest_order_status?.status} on ${moment(product?.latest_order_status?.date).format("MMM DD, YYYY")}`}</p>
        </div>
        <p className="text-[0.67rem] text-gray-700">
          {getOrderStatusConfig()?.title}
        </p>
        {[DELIVERED, RETURNED].includes(
          product?.latest_order_status?.status
        ) && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              navigate(`/rate-product/${product?.product_id}`)
            }}
            className="mt-3 flex gap-x-1 text-blue-500"
          >
            <IoMdStar size={20} />
            <p className="text-xs">Rate & Review Product</p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
