/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to="/product-detail/1"
      className="w-full   flex flex-col items-start justify-start px-2 cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-2 border-gray-100 rounded-sm py-2"
    >
      <div className=" w-full ">
        <div className="bg-green-20 w-full h-44 bg-pink-30 my-2 md:h-40 lg:h-56 flex flex-col items-center justify-center">
          <img src={product?.image} className="w-40 h-auto" alt="" />
        </div>
      </div>
      <div className="mt-2 flex flex-col justify-between gap-y-1">
        <p className="text-sm">{product?.name}</p>
        <p className="text-xs text-gray-500  line-clamp-4">
          {product?.description}
        </p>
        <p className="text-sm font-bold">₹{product?.price}</p>
        <p className="text-xs font-semibold">
          {product?.deliveryCharges !== 0
            ? `₹${product?.deliveryCharges} delivery charge`
            : "free delivery"}
        </p>
        <p className="text-pink-600 text-xs font-semibold">
          {product?.quantity <= 10 && "only few left"}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
