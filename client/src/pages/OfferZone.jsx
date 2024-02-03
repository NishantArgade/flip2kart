import React from "react";
import { Link } from "react-router-dom";

const OfferZone = () => {
  return (
    <div className="container mx-auto ">
      <div className="bg-white  pb-5 mb-5">
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <p className="font-medium text-xl text-gray-800">Top Deals</p>
          <p className="text-xs text-gray-500">12 items</p>
        </div>
        <div className="flex justify-center gap-14 flex-wrap px-4">
          {Array.from({ length: 10 }).map((i) => (
            <Link
              key={i}
              to="/all-products"
              className="flex flex-col  gap-2  shadow-md w-44 items-b justify-center hover:scale-105 transition-all duration-500"
            >
              <div className=" h-full flex flex-col items-center justify-center">
                <img src="/shirt.png" className="w-full" alt="" />
              </div>
              <div className="flex flex-col justify-center items-center text-sm gap-2 px-2 py-4">
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
  );
};

export default OfferZone;
