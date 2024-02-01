import React from "react";
import { MdLocalOffer } from "react-icons/md";

const OffersList = () => {
  return (
    <div className="flex flex-col justify-start gap-y-1 mb-2">
      <p className="text-xs text-gray-950 tracking-wide font-medium">
        Available Offers
      </p>
      <div className="text-xs text-gray-800 flex">
        <span className="mr-2">
          <MdLocalOffer className="text-green-500 text-sm" />
        </span>
        <span>
          <span className="font-semibold">Bank Offer</span> dolor sit amet
          consectetur adipisicing elit. Consequatur quod ab doloribus obcaecati,
          nesciunt eaque et ullam enim.
        </span>
      </div>
      <div className="text-xs text-gray-800 flex">
        <span className="mr-2">
          <MdLocalOffer className="text-green-500 text-sm" />
        </span>
        <span>
          <span className="font-semibold">Bank Offer</span> dolor sit amet
          consectetur adipisicing elit. Consequatur quod ab doloribus obcaecati,
          nesciunt eaque et ullam enim.
        </span>
      </div>
      <div className="text-xs text-gray-800 flex">
        <span className="mr-2">
          <MdLocalOffer className="text-green-500 text-sm" />
        </span>
        <span>
          <span className="font-semibold">Bank Offer</span> dolor sit amet
          consectetur adipisicing elit. Consequatur quod ab doloribus obcaecati,
          nesciunt eaque et ullam enim.
        </span>
      </div>
    </div>
  );
};

export default OffersList;
