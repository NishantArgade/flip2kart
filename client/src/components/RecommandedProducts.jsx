import React from "react";
import { Link } from "react-router-dom";

const RecommandedProducts = () => {
  return (
    <div className="bg-white container mx-auto p-2 m-2 w-full ">
      <div className="text-md pb-2">Recommanded Products</div>
      <div className="flex items-start justify-starts gap-x-4">
        <Link
          to="/product-detail/4"
          className=" w-[10rem] p-2  cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm "
        >
          <div className="h-44 flex flex-col justify-center items-center overflow-hidden ">
            <img
              src="/shirt.png"
              className="w-[10rem]  m-2 hover:scale-105"
              alt=""
            />
          </div>
          <div className="mt-2 flex flex-col justify-between gap-y-1">
            <p className="text-[0.8rem]">
              Lorem ipsum dolor sif asdf asdft amet.
            </p>
            <p className="text-xs text-gray-500">
              description Lorem ipsum dolo.
            </p>
            <p className="text-sm font-bold">$200</p>
            <p className="text-xs font-semibold">free delivery</p>
            <p className="text-pink-600 text-xs font-semibold">only few left</p>
          </div>
        </Link>
        <Link
          to="/product-detail/3"
          className=" w-[10rem] p-2  cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm "
        >
          <div className="h-44 flex flex-col justify-center items-center overflow-hidden ">
            <img
              src="/book.png"
              className="w-[10rem]  m-2 hover:scale-105"
              alt=""
            />
          </div>
          <div className="mt-2 flex flex-col justify-between gap-y-1">
            <p className="text-[0.8rem]">
              Lorem ipsum dolor sif asdf asdft amet.
            </p>
            <p className="text-xs text-gray-500">
              description Lorem ipsum dolo.
            </p>
            <p className="text-sm font-bold">$200</p>
            <p className="text-xs font-semibold">free delivery</p>
            <p className="text-pink-600 text-xs font-semibold">only few left</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecommandedProducts;
