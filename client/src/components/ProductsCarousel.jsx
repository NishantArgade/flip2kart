import { Carousel } from "@mantine/carousel";
import React from "react";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductsCarousel = ({
  title = "",
  showRating = true,
  showStrikePrice = true,
  showDiscount = true,
}) => {
  return (
    <div className="container mx-auto bg-white  shadow-md p-2 my-2">
      <p className="pl-2 md:text-lg text-sm pt-3 pb-4 font-semibold text-gray-700">
        {title}
      </p>
      <Carousel
        withIndicators
        height={300}
        slideSize="16.66%"
        slideGap="xs"
        loop
        align="start"
        slidesToScroll={6}
        previousControlIcon={
          <MdOutlineNavigateBefore
            size={20}
            className="bg-[#f8f8f8f9] w-8 h-8 rounded-full border-2 text-gray-600"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="bg-[#f8f8f8ec] h-8 w-8  rounded-full border-2 text-gray-600"
          />
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Carousel.Slide key={i}>
            <div className="border-[1.5px] hover:shadow-md ">
              <div className="md:h-44 h-32 my-1 flex flex-col justify-center items-center overflow-hidden relative">
                <Link to="/product-detail/4">
                  <img
                    src="/camera.png"
                    className="w-[5rem] md:w-[6rem] lg:w-[10rem] m-2 hover:scale-105"
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
                <p className="md:text-[0.9rem] text-[0.8rem] mt-1 flex md:flex-row flex-col items-start">
                  <span className=" mr-2 font-bold">₹1,500</span>
                  {showStrikePrice && (
                    <strike className="mr-2  text-gray-700">₹2300</strike>
                  )}
                  {showDiscount && (
                    <span className="text-green-600 ">24% off</span>
                  )}
                </p>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>

    // <div className="bg-white container mx-auto p-2 m-2 w-full ">
    //   <div className="text-md pb-2">Recommanded Products</div>
    //   <div className="flex items-start justify-starts gap-x-4">

    //   </div>
    // </div>
  );
};

export default ProductsCarousel;
