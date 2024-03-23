/* eslint-disable react/prop-types */
import moment from "moment"
import { Link } from "react-router-dom"

const ProductCard = ({ product, orderID }) => {
  function getDeliveryStatusMessage(status) {
    switch (status) {
      case "Order Confirmed":
        return "Your order for this item has been confirmed"
      case "Shipped":
        return "Your item has been shipped"
      case "Out for delivery":
        return "Your item has been Out for delivery"
      case "Delivered":
        return "Your item has been deliverd"
    }
  }

  return (
    <Link
      to={`/order-detail?order=${orderID}&product=${product?.product_id}`}
      key={product?.product_id}
      className="grid grid-cols-12 border-b-[1.5px] px-4 py-5  hover:shadow-md "
    >
      <div className="col-span-6 flex w-full gap-4">
        <div className="h-24 w-24 cursor-pointer rounded-sm border border-gray-200 p-1">
          <img
            src={product?.images[0].url}
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
      <div className="col-span-2 mb-2  text-center text-sm md:mb-0">
        ₹{product?.price - product?.discount}
      </div>
      <div className="col-span-4 ">
        <div className="flex items-center  justify-start gap-x-2">
          <div className="h-2 w-2 rounded-full bg-green-600"> </div>
          <p className="text-sm">{`${product?.latest_order_status?.status} on ${moment(product?.latest_order_status?.date).format("MMM DD, YYYY")}`}</p>
        </div>
        <p className="text-xs text-gray-700">
          {getDeliveryStatusMessage(product?.latest_order_status?.status)}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
