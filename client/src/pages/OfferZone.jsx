import React from "react"
import { Link } from "react-router-dom"

const OfferZone = () => {
  return (
    <div className="container mx-auto ">
      <div className="mb-5  bg-white pb-5">
        {/** Heading */}
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <p className="text-xl font-medium text-gray-800">Top Deals</p>
          <p className="text-xs text-gray-500">12 items</p>
        </div>
        {/** Product Listing */}
        <div className="flex flex-wrap justify-center gap-14 px-4">
          {Array.from({ length: 10 }).map((i) => (
            <Link
              key={i}
              to="/all-products"
              className="items-b flex  w-44  flex-col justify-center gap-2 shadow-md transition-all duration-500 hover:scale-105"
            >
              <div className=" flex h-full flex-col items-center justify-center">
                <img src="/shirt.png" className="w-full" alt="" />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 px-2 py-4 text-sm">
                <p className="font-medium">cottom shirt</p>
                <p className="text-green-500">From 200</p>
                <p className="line-clamp-1 text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                  culpa pariatur iste dolorem reiciendis perspiciatis illo. Qui
                  sapiente assumenda ducimus.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OfferZone
