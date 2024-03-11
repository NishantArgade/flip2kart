import { calculateDiscountedPrice } from "../../../utils/helper"

const BasicInfo = ({ data, reviewData }) => {
  console.log("reviewData", reviewData)

  return (
    <div className="flex flex-col items-start justify-start gap-y-2  pt-10 md:pt-0">
      <p className="text-md">{data?.name}</p>
      <p className="text-xs text-gray-800">{data?.description}</p>
      {reviewData?.overallRating > 0 ? (
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <p
            className={`${reviewData?.overallRating == 1 ? "bg-red-400" : reviewData?.overallRating == 2 ? "bg-orange-400" : "bg-green-600"}  rounded-sm px-[6px]  text-[0.65rem] text-white`}
          >
            {reviewData?.overallRating}★
          </p>
          <p>
            {reviewData?.totalRatingsCount} Ratings &{" "}
            {reviewData?.reviews.length} Reviews
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No ratings yet</p>
      )}
      <p className="mt-3 text-xs">
        <span className="mr-2 text-[1.30rem] font-bold">
          ₹{calculateDiscountedPrice(data?.price, data?.discount)}
        </span>
        <strike className="mr-2 text-gray-700">₹{data?.price}</strike>
        <span className="font-semibold text-green-600">
          {data?.discount}% off
        </span>
      </p>
      {data?.stock === 0 && (
        <p className="text-xs text-red-400">Currently Out of Stock</p>
      )}
      {data?.stock >= 1 && data?.stock <= 10 && (
        <p className="text-xs text-red-400">Hurry, Only a few left!</p>
      )}
    </div>
  )
}

export default BasicInfo
