import React from "react";
import { BsFillLightningFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import ProductIMGCarousel from "./ProductIMGCarousel";

const ProductImageContainer = () => {
  return (
    <div>
      <ProductIMGCarousel />
      <div className="flex  p-2 gap-3 lg:flex-row md:flex-col mt-4  flex-col">
        <div className="bg-[#FF9F00] py-3 px-auto w-full text-white flex items-center justify-center gap-x-1  cursor-pointer shadow-md">
          <IoCart className="text-[1.1rem]" />
          <button className="text-xs font-semibold uppercase">
            Add to Cart
          </button>
        </div>
        <div className="bg-[#FB641B] py-3 px-auto  w-full text-white flex items-center justify-center gap-x-1 cursor-pointer shadow-md">
          <BsFillLightningFill className="text-[0.9rem]" />
          <button className="text-xs font-semibold uppercase">Buy Now</button>
        </div>
      </div>
      <IoMdHeart
        className="absolute top-2 right-2 z-10  text-gray-300 cursor-pointer bg-gray-100 p-1 rounded-full border-e-2 border-gray-200"
        size={35}
      />
    </div>
  );
};

export default ProductImageContainer;
