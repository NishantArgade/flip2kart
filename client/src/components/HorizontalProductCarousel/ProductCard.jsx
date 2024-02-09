import { IoMdHeart } from "react-icons/io"
import { Link } from "react-router-dom"

const HorizontalProductCarouselCard = ({
  showRating,
  showStrikePrice,
  showDiscount,
  product,
}) => {
  return (
    <div className="border-[1.5px] hover:shadow-md ">
      <div className="relative my-1 flex h-32 flex-col items-center justify-center overflow-hidden md:h-44">
        <Link to="/product-detail/4">
          <img
            src={product?.image}
            className="m-2 w-[5rem] hover:scale-105 md:w-[6rem] lg:w-[9rem]"
            alt=""
          />
        </Link>
        <span className="absolute right-1 top-0 cursor-pointer text-gray-300">
          <IoMdHeart size={21} />
        </span>
      </div>
      <div className="flex w-[8rem] flex-col justify-between gap-y-1 p-2 md:w-[8.6rem] lg:w-full">
        <Link
          to="/product-detail/4"
          className="text-[0.78rem] text-gray-800 hover:text-blue-500 md:text-[0.8rem]"
        >
          {product?.name}
        </Link>
        {showRating && (
          <div className="text-[0.5rem] text-gray-700 md:text-xs ">
            <span className="mr-2 rounded-sm bg-green-600 px-1 py-[2px] text-white">
              {product?.rating}★
            </span>
            <span className="font-medium text-gray-500">
              (${product?.reviewCount})
            </span>
          </div>
        )}
        <p className="mt-1 flex flex-col items-center  justify-start text-[0.8rem] md:flex-row md:text-[0.9rem]">
          <span className=" mr-2 font-bold">₹{product?.price}</span>
          {showStrikePrice && (
            <strike className="mr-2  text-xs text-gray-700">
              ₹{product?.StrikePrice}
            </strike>
          )}
          {showDiscount && (
            <span className="text-xs text-green-600">
              {product?.discount}% off
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default HorizontalProductCarouselCard
