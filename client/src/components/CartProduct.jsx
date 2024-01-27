import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Link } from "react-router-dom";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

const CartProduct = () => {
  return (
    <>
      <div className="bg-white flex flex-col justify-start items-start gap-y-2 py-4 border-b-[1.5px]">
        <div className="flex md:flex-row flex-col justify-between items-start px-2 w-full">
          <div className="flex justify-start items-start gap-x-2">
            <Link to={"/product-detail/1"} className="p-2 w-32 cursor-pointer ">
              <img src="/camera.png" alt="" />
            </Link>

            <div className="text-sm">
              <Link
                to={"/product-detail/1"}
                className="cursor-pointer hover:text-blue-500"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Link>
              <p className="text-xs text-gray-500">Lorem ipsum dolor adf.</p>
              <p className="text-xs text-gray-500 my-3 flex flex-col md:flex-row justify-start  items-start md:items-center justify-start gap-x-2">
                <p>
                  <span>Seller: </span>Lorem ipsum dolor adf
                </p>
                <img src="/assured.png" className="w-12 mt-1 md:mt-0" alt="" />
              </p>

              <p className="text-xs mt-1">
                <span className="text-[1rem] mr-2 font-bold">₹1,500</span>
                <strike className="mr-2 text-gray-700">₹2300</strike>
                <span className="text-green-600 ">24% off</span>
              </p>
            </div>
          </div>
          {/* Delivery By */}
          <div className="text-xs self-center md:self-start pl-9 pt-2 ml-4 md:ml-0 md:p-0 ">
            <p>Dilivery by tomorrow, Fri</p>
          </div>
        </div>
        <div className="px-4 flex items-center justify-start gap-x-6 text-sm mt-4 ">
          <div className="flex items-center justify-start gap-x-2 ">
            <button className="border-2 w-6 px-2 rounded-full  shadow-sm">
              -
            </button>
            <input type="text" className="w-10 border-2 outline-none px-1" />
            <button className="border-2 w-6 px-1 rounded-full  shadow-sm">
              +
            </button>
          </div>
          <DeleteConfirmModal>
            <button className="font-medium  hover:text-blue-500">REMOVE</button>
          </DeleteConfirmModal>
          {/* <button className="font-medium hover:text-blue-600">REMOVE</button> */}
        </div>
      </div>
    </>
  );
};

export default CartProduct;
