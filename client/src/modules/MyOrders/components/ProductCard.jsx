/* eslint-disable react/prop-types */
import moment from "moment"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/order-detail/${product?.id}`}
      key={product?.id}
      className="flex flex-col items-start justify-between gap-2 gap-x-16 border-b-[1.5px] px-4 py-5  hover:shadow-md lg:flex-row"
    >
      <div className="flex items-start justify-start gap-x-3 md:flex-col md:gap-2 lg:flex-row ">
        <div className="w-20 cursor-pointer px-3 pt-1">
          <img src="/shirt.png" alt="" />
        </div>

        <div className="w-full text-sm">
          <p className="cursor-pointer text-gray-800">{product?.name}</p>
          <p className="cursor-pointer text-xs text-gray-500">
            {product?.description}
          </p>
        </div>
      </div>
      <div className="mb-2  text-center text-sm md:mb-0">
        ₹{product?.amount}
      </div>
      <div>
        <div className="flex items-center  justify-start gap-x-2">
          <div className="h-2 w-2 rounded-full bg-green-600"> </div>
          <p className="text-sm">
            {" "}
            Delivered on {moment(product?.deliveredDate).format("MM DD, YYYY")}
          </p>
        </div>
        <p className="text-xs text-gray-700">
          Lorem ipsum dolor ctetur adipisicin ctetur adipisicinctetur
          adipisicincteturg elit. Atque, dicta.
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
