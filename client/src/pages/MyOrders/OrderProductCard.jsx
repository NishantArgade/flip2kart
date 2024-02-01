/* eslint-disable react/prop-types */
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const OrderProductCard = ({ product }) => {
  return (
    <Link
      to={`/order-detail/${product?.id}`}
      key={product?.id}
      className="hover:shadow-md flex flex-col gap-2 lg:flex-row justify-between items-start px-4 gap-x-16  py-5 border-b-[1.5px]"
    >
      <div className="flex md:flex-col md:gap-2 lg:flex-row justify-start items-start gap-x-3 ">
        <div className="px-3 pt-1 w-20 cursor-pointer">
          <img src="/shirt.png" alt="" />
        </div>

        <div className="text-sm w-full">
          <p className="cursor-pointer text-gray-800">{product?.name}</p>
          <p className="cursor-pointer text-xs text-gray-500">
            {product?.description}
          </p>
        </div>
      </div>
      <div className="text-sm  text-center mb-2 md:mb-0">
        ₹{product?.amount}
      </div>
      <div>
        <div className="flex justify-start  items-center gap-x-2">
          <div className="w-2 h-2 rounded-full bg-green-600"> </div>
          <p className="text-sm">
            {" "}
            Delivered on {moment(product?.deliveredDate).format("MM DD, YYYY")}
          </p>
        </div>
        <p className="text-xs text-gray-700">
          Lorem ipsum dolor ctetur adipisicin ctetur adipisicinctetur
          adipisicincteturg elit. Atque, dicta.
        </p>
      </div>
    </Link>
  );
};

export default OrderProductCard;
