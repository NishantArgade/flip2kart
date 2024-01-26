import React from "react";
import { IoMdTrash } from "react-icons/io";

const Wishlist = () => {
  return (
    <>
      <p className="border-b-[1.5px] px-4 py-4">
        My Wishlist <span className="text-gray-500">(2)</span>
      </p>
      <div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex justify-between items-start px-4 w-full  py-5 border-b-[1.5px]"
          >
            <div className="flex justify-start items-start gap-x-3">
              <div className="px-3 pt-1 w-20 cursor-pointer">
                <img src="/shirt.png" alt="" />
              </div>

              <div className="text-sm">
                <p className="cursor-pointer text-gray-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="text-xs text-gray-700 mt-2">
                  <div className="text-xs text-gray-700 flex items-center justify-start gap-x-2">
                    <span className="bg-green-600 px-1 py-[2px] rounded-sm  text-white">
                      4.5★
                    </span>
                    <span className="font-medium text-gray-500">(460)</span>
                    <div>
                      <img src="/assured.png" className="w-14" alt="" />
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-4">
                  <span className="text-[1.2rem] mr-2 font-bold">₹1,500</span>
                  <strike className="mr-2 text-gray-700">₹2300</strike>
                  <span className="text-green-600 ">24% off</span>
                </p>
              </div>
            </div>
            <div>
              <IoMdTrash className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
