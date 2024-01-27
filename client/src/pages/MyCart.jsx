import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsFillLightningFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import ChangeAddressModal from "../components/modals/ChangeAddressModal";

const MyCart = () => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-12  gap-x-3 m-2">
        {/* Products List */}
        <div className="md:col-span-8 col-span-12">
          {/* Address */}
          <div className="flex items-center justify-between bg-white  shadow-md px-2 py-3 mb-2 text-xs">
            <div className="flex flex-col items-start justify-center gap-y-1">
              <div className="flex items-center justify-start">
                <p>Deliver to: </p>
                <p className="font-semibold ml-1"> Nishnt Vilas Argade</p>
              </div>
              <p className="text-gray-500">
                Office No: 520, Amonora chamber, handapasar mall 411021
              </p>
            </div>
            <ChangeAddressModal>
              <button className="py-2 px-4 border-2  text-blue-500 bg-white rounded-sm shadow-sm hover:shadow-md  font-semibold">
                Change
              </button>
            </ChangeAddressModal>
          </div>

          <div className="shadow-md">
            {/* 1 product */}
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
            <CartProduct />
          </div>
        </div>

        {/* Amount info */}
        <div className="md:col-span-4 col-span-12 h-fit text-sm md:sticky md:top-[4.7rem] md:right-0">
          <div className="bg-white  shadow-md  flex  flex-col pb-2">
            <div>
              <p className="text-gray-500  px-4 py-3 border-b-2 ">
                PRICE DETAILS
              </p>

              <div className="flex flex-col justify-start items-start gap-y-4 p-4  ">
                <div className="flex items-center justify-between w-full">
                  <p>Price (4 items)</p>
                  <p>₹35,000</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>Price (4 items)</p>
                  <p>₹35,000</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p>Price (4 items)</p>
                  <p>₹35,000</p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start px-4 py-5 border-dashed border-y-2 ">
                <div className="flex items-center justify-between w-full font-semibold">
                  <p>Total Amount</p>
                  <p>₹70,000</p>
                </div>
              </div>
              <p className="p-4 text-green-600 text-xs font-semibold tracking-wide ">
                You will save ₹18,256 on this order
              </p>
            </div>

            <Link
              to="/checkout"
              className="bg-[#FB641B] py-3 md:text-sm lg:text-base self-end lg:px-12 px-10 md:px-6 mx-4 mt-2 text-white   w-fit  cursor-pointer shadow-md"
            >
              <button className="text-xs font-semibold uppercase">
                PLACE ORDER
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-start gap-x-2 mt-4 text-xs text-gray-500 px-2">
            <AiFillSafetyCertificate className="text-2xl" />
            <p className="font-semibold ">
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
//

export default MyCart;
