import React from "react";

const CartProduct = () => {
  return (
    <div className="bg-white flex flex-col justify-start items-start gap-y-2 py-4 border-b-[1.5px]">
      <div className="flex justify-between items-start px-2 w-full">
        <div className="flex justify-start items-start gap-x-2">
          <div className="p-2 w-32 cursor-pointer">
            <img src="/camera.png" alt="" />
          </div>

          <div className="text-sm">
            <p className="cursor-pointer">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-xs text-gray-500">Lorem ipsum dolor adf.</p>
            <p className="text-xs text-gray-500 my-3 flex items-center justify-start gap-x-2">
              <p>
                <span>Seller: </span>Lorem ipsum dolor adf
              </p>
              <img src="/assured.png" className="w-12" alt="" />
            </p>

            <p className="text-xs mt-1">
              <span className="text-[1rem] mr-2 font-bold">₹1,500</span>
              <strike className="mr-2 text-gray-700">₹2300</strike>
              <span className="text-green-600 ">24% off</span>
            </p>
          </div>
        </div>
        {/* Delivery By */}
        <div className="text-xs">
          <p>Dilivery by tomorrow, Fri</p>
        </div>
      </div>
      <div className="px-4 flex items-center justify-start gap-x-4 text-sm mt-4 ">
        <div className="flex items-center justify-start gap-x-2 ">
          <button className="border-2 w-6 px-2 rounded-full  shadow-sm">
            -
          </button>
          <input type="text" className="w-10 border-2 outline-none px-1" />
          <button className="border-2 w-6 px-1 rounded-full  shadow-sm">
            +
          </button>
        </div>
        <button className="font-medium hover:text-blue-600">REMOVE</button>
      </div>
    </div>
  );
};

export default CartProduct;
