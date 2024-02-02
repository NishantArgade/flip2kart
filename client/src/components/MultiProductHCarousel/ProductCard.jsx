import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";

const ProductCard = ({ showRating, showStrikePrice, showDiscount }) => {
  return (
    <div className="border-[1.5px] hover:shadow-md ">
      <div className="md:h-44 h-32 my-1 flex flex-col justify-center items-center overflow-hidden relative">
        <Link to="/product-detail/4">
          <img
            src="/camera.png"
            className="w-[5rem] md:w-[6rem] lg:w-[9rem] m-2 hover:scale-105"
            alt=""
          />
        </Link>
        <span className="absolute top-0 right-1 text-gray-300 cursor-pointer">
          <IoMdHeart size={21} />
        </span>
      </div>
      <div className="p-2 flex flex-col justify-between gap-y-1 w-[8rem] md:w-[8.6rem] lg:w-full">
        <Link
          to="/product-detail/4"
          className="md:text-[0.8rem] text-[0.78rem] text-gray-800 hover:text-blue-500"
        >
          Lorem ipsum dolor sif asdf asdft amet.
        </Link>
        {showRating && (
          <div className="md:text-xs text-[0.5rem] text-gray-700 ">
            <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
              4.5★
            </span>
            <span className="font-medium text-gray-500">(460)</span>
          </div>
        )}
        <p className="md:text-[0.9rem] text-[0.8rem] mt-1 flex md:flex-row justify-start items-end flex-col">
          <span className=" mr-2 font-bold">₹1,500</span>
          {showStrikePrice && (
            <strike className="mr-2  text-gray-700 text-xs">₹2300</strike>
          )}
          {showDiscount && (
            <span className="text-green-600 text-xs">24% off</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
