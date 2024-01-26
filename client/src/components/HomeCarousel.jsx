import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const HomeCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <div className="mt-3 h-50 bg-white">
      {" "}
      <Carousel
        height={200}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.play}
        onMouseLeave={autoplay.current.play}
        onClick={autoplay.current.play}
        onSlideChange={autoplay.current.play}
        nextControlIcon={
          <MdOutlineNavigateNext className="bg-[#f8f8f8ec] h-8 w-8 rounded-full border-2 text-gray-600" />
        }
        previousControlIcon={
          <MdOutlineNavigateBefore className="bg-[#f8f8f8ec] h-8 w-8 rounded-full border-2 text-gray-600" />
        }
        withIndicators
      >
        <Carousel.Slide>
          <div className="bg-red-200 h-full w-full">
            <Image src="carouselImages/1.png" alt="" />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          {" "}
          <div className="bg-green-200 h-full w-full">
            <Image src="carouselImages/2.png" alt="" />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          {" "}
          <div className="bg-yellow-200 h-full w-full">
            <Image src="carouselImages/3.png" alt="" />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          {" "}
          <div className="bg-yellow-200 h-full w-full">
            <Image src="carouselImages/4.png" alt="" />
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
