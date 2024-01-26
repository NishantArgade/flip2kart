import { Progress } from "@mantine/core";
import React from "react";

const CustomerReview = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-y-3 border-[1.5px]">
      <div className="flex justify-between items-center w-full p-2">
        <p className="text-xl font-semibold tracking-tight  text-gray-800">
          Ratings & Reviews
        </p>
        <button className="py-3 text-sm px-5 shadow-md">Rate Product</button>
      </div>

      {/* Review Info */}
      <div className="grid grid-cols-12 border-b-[1.5px] pb-4 ">
        <div className="col-span-2 flex flex-col justify-center items-center">
          <p className="text-xl text-center">4.5★</p>
          <p className="text-xs text-gray-500 text-center">
            560 Ratings & 84 Reviews
          </p>
        </div>
        <div className="col-span-10 text-xs flex flex-col gap-y-1">
          <div className="flex items-center justify-start gap-x-2">
            <span className="text-[13px] font-medium">5 ★</span>
            <Progress value={80} className="w-44" size={4} color="green" />
            <span className="text-gray-500 text-[13px]">412</span>
          </div>

          <div className="flex items-center justify-start gap-x-2">
            <span className="text-[13px] font-medium">4 ★</span>
            <Progress value={30} className="w-44" size={4} color="orange" />
            <span className="text-gray-500 text-[13px]">412</span>
          </div>

          <div className="flex items-center justify-start gap-x-2">
            <span className="text-[13px] font-medium">3 ★</span>
            <Progress value={50} className="w-44" size={4} color="green" />
            <span className="text-gray-500 text-[13px]">412</span>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <span className="text-[13px] font-medium">2 ★</span>
            <Progress value={50} className="w-44" size={4} color="green" />
            <span className="text-gray-500 text-[13px]">412</span>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <span className="text-[13px] font-medium">1 ★</span>
            <Progress value={50} className="w-44" size={4} color="green" />
            <span className="text-gray-500 text-[13px]">412</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-y-3 border-b-[1.5px] p-2">
        <div>
          <p className="text-xs text-gray-700">
            <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
              4.5★
            </span>
            <span className="font-semibold">Awesome</span>
          </p>
          <p className="text-xs text-gray-800 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            cupiditate commodi excepturi adipisci cum similique fuga consequatur
            possimus repudiandae ipsum.
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 w-40 bg-gray-100 h-16 p-2">
          <img className="w-10" src="/camera.png" alt="" />
          <img className="w-10" src="/book.png" alt="" />
          <img className="w-10" src="/shirt.png" alt="" />
        </div>
        <dir className="flex text-[13px] gap-x-2 text-gray-600">
          <span>Nishant Argade</span>
          <span>Aug, 2023</span>
        </dir>
      </div>
    </div>
  );
};

export default CustomerReview;
