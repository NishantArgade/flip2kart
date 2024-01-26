import React from "react";
import { Link } from "react-router-dom";

const ReviewAndRatings = () => {
  return (
    <>
      <p className="border-b-[1.5px] px-4 py-4">
        My Review <span className="text-gray-500">(2)</span>
      </p>
      <div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex justify-between items-start px-4 w-full  py-5 border-b-[1.5px]"
          >
            <div className="flex justify-start items-start gap-x-3">
              <div className="px-3 pt-1 w-20 ">
                <img src="/shirt.png" alt="" />
              </div>

              <div className="text-sm">
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="text-xs text-gray-700 mt-2">
                  <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
                    4.5★
                  </span>
                  <span className="text-gray-800 font-semibold">
                    Mind-blowing purchase
                  </span>
                </div>
                <p className="text-xs text-gray-800 mt-2">Awesome product</p>
                <p className="text-xs text-gray-500 mt-2">
                  Nishant Argade <span>09 Dec, 2023</span>
                </p>

                <div className="mt-2">
                  <button className="mr-6 text-blue-500 font-semibold text-xs">
                    Edit
                  </button>
                  <button className="text-blue-500 font-semibold text-xs">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewAndRatings;
