import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { IoMdHeart } from "react-icons/io"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toggleProductFromWishlist } from "../../api/productApi"
import { queryClient } from "../../main"
import { calculateDiscountedPrice } from "../../utils/helper"

const HorizontalProductCarouselCard = ({
  showRating,
  showStrikePrice,
  showDiscount,
  product,
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false)
  const user = useSelector((state) => state.user.data)

  const { mutate, isPending } = useMutation({
    mutationKey: "toggleProductFromWishlist",
    mutationFn: async () => await toggleProductFromWishlist(product),
    onSuccess: () => queryClient.invalidateQueries("checkAuth"),
  })

  function handleAddToWishlist() {
    mutate(product?._id)
  }
  return (
    <div className="border-[1.5px] hover:shadow-md ">
      <div className="relative my-1 flex h-32 flex-col items-center justify-center overflow-hidden md:h-44">
        <Link to={`/product-detail/${product?._id}`} className="h-full w-32">
          <img
            src={
              isImageLoaded ? product?.images[0].url : "/photoPlaceholder.png"
            }
            onLoad={() => setImageLoaded(true)}
            className="m-1 h-full w-full object-contain p-2 hover:scale-105  "
            alt="photoPlaceholder"
          />
        </Link>
        <button
          disabled={isPending}
          onClick={handleAddToWishlist}
          className={`${user?.wishlist?.includes(product?._id) ? "text-red-500" : "text-gray-300"} absolute right-1 top-0 cursor-pointer text-gray-300`}
        >
          <IoMdHeart size={21} />
        </button>
      </div>
      <div className="flex w-[8rem] flex-col justify-between gap-y-1 p-2 md:w-[8.6rem] lg:w-full">
        <Link
          to={`/product-detail/${product?._id}`}
          className="line-clamp-2 text-[0.78rem] text-gray-800 hover:text-blue-500 md:text-[0.8rem]"
        >
          {product?.name}
        </Link>
        {showRating &&
          (product?.overall_rating !== 0 ? (
            <div className="text-[0.5rem] text-gray-700 md:text-xs ">
              <span className="mr-2 rounded-sm bg-green-600 px-1 py-[2px] text-white">
                {product?.overall_rating}★
              </span>

              <span className="font-medium text-gray-500">
                ({product?.rating_count})
              </span>
            </div>
          ) : (
            <div className="text-[0.5rem] text-gray-500 md:text-xs ">
              No ratings yet
            </div>
          ))}
        <p className="mt-1 flex flex-col items-center  justify-start text-[0.8rem] md:flex-row md:text-[0.9rem]">
          <span className=" mr-2 font-bold">
            ₹{calculateDiscountedPrice(product?.price, product?.discount)}
          </span>
          {showStrikePrice && (
            <strike className="mr-2  text-xs text-gray-700">
              ₹{product?.price}
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
