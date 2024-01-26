import React from "react";

const ProductHighlight = () => {
  return (
    <div className="text-xs flex flex-col justify-start items-start gap-y-4">
      <div className="flex gap-x-2 items-start ">
        <p className="w-16 text-gray-500">Highlights</p>
        <div>
          <p>Lorem, ipsum dolor.</p>
          <p>Lorem, ipsum dolor.</p>
          <p>Lorem, ipsum dolor.</p>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
      <div className="flex gap-x-2 items-start ">
        <p className="w-16 text-gray-500">Seller</p>
        <div>
          <p>FlipMore</p>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
      <div className="flex gap-x-2 items-start ">
        <p className="w-16 text-gray-500">Service</p>
        <p>Cash on Delivery available</p>
      </div>
      <div className="flex gap-x-2 items-start ">
        <p className="w-16 text-gray-500">Wrantty</p>
        <p>1 year wrantty</p>
      </div>
    </div>
  );
};

export default ProductHighlight;
