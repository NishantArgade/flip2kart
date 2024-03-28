import React from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTopOfferProducts } from "../../api/productApi"
import Spinner from "../../components/Spinner"
import { calculateDiscountedPrice } from "../../utils/helper"

const OfferZone = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["topOfferProducts"],
    queryFn: getTopOfferProducts,
  })

  if (data?.products?.length === 0)
    return (
      <div className="container mx-auto">
        <div className="flex h-96 items-center justify-center">
          <p className="text-lg text-gray-500">No top deal available</p>
        </div>
      </div>
    )

  return (
    <div className="container mx-auto ">
      <div className="mb-5  rounded-sm bg-white pb-5 shadow-md">
        {/** Heading */}
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <p className="text-xl font-medium text-gray-800">Top Deals</p>
          {!isLoading && (
            <p className="mb-10 text-xs text-gray-500">
              {data?.products?.length} items
            </p>
          )}
        </div>
        {/** Product Listing */}
        {!isLoading ? (
          <div className="flex flex-wrap justify-center gap-14 px-4">
            {data?.products?.map((product) => (
              <Link
                key={product._id}
                to={`/product-detail/${product._id}`}
                className="items-b flex w-72 flex-col  justify-center gap-2 shadow-md transition-all duration-500 hover:scale-105 md:w-44"
              >
                <div className="h-40 w-full px-2 md:w-40 ">
                  <img
                    src={product?.images[0]?.url}
                    className="h-full w-full  object-contain"
                    alt=""
                  />
                </div>
                <div className="flex min-h-36 w-full flex-col items-center justify-center gap-2 px-4 py-4 text-sm">
                  <p className="line-clamp-2 w-full font-medium">
                    {product.name}
                  </p>
                  <div className="flex w-full   items-center justify-start gap-x-3 text-[0.8rem] md:flex-row md:text-[0.9rem]">
                    <span className="font-bold">
                      ₹
                      {calculateDiscountedPrice(
                        product?.price,
                        product?.discount
                      ).toLocaleString("en-IN")}
                    </span>

                    <strike className="text-xs text-gray-700">
                      ₹{product?.price}
                    </strike>

                    <span className="text-xs text-green-600">
                      {product?.discount}% off
                    </span>
                  </div>
                  <p className="line-clamp-2 text-gray-500">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center">
            <p className="mb-5 text-lg text-gray-500">
              <Spinner />
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OfferZone
