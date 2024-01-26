import { Carousel } from "@mantine/carousel";
import React from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductsCarousel = ({
  title = "",
  showRating = true,
  showStrikePrice = true,
  showDiscount = true,
}) => {
  return (
    <div className="container mx-auto bg-white p-2 my-2">
      <p className="pl-2 text-lg pt-3 font-semibold text-gray-700">{title}</p>
      <Carousel
        withIndicators
        height={300}
        slideSize="16.66%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={6}
        nextControlIcon={
          <MdOutlineNavigateNext className="bg-[#f8f8f8ec] h-8 w-8 rounded-full border-2 text-gray-600" />
        }
        previousControlIcon={
          <MdOutlineNavigateBefore className="bg-[#f8f8f8ec] h-8 w-8 rounded-full border-2 text-gray-600" />
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Carousel.Slide key={i}>
            <Link
              to="/product-detail/4"
              className="cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm "
            >
              <div className="h-44 flex flex-col justify-center items-center overflow-hidden ">
                <img
                  src="/shirt.png"
                  className="w-[10rem]  m-2 hover:scale-105"
                  alt=""
                />
              </div>
              <div className="p-2 flex flex-col justify-between gap-y-1">
                <p className="text-[0.8rem] text-gray-800">
                  Lorem ipsum dolor sif asdf asdft amet.
                </p>
                {showRating && (
                  <div className="text-xs text-gray-700">
                    <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
                      4.5★
                    </span>
                    <span className="font-medium text-gray-500">(460)</span>
                  </div>
                )}
                <p className="text-xs mt-1">
                  <span className="text-[0.9rem] mr-2 font-bold">₹1,500</span>
                  {showStrikePrice && (
                    <strike className="mr-2 text-gray-700">₹2300</strike>
                  )}
                  {showDiscount && (
                    <span className="text-green-600 ">24% off</span>
                  )}
                </p>
              </div>
            </Link>
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
