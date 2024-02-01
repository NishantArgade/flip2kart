import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const AdAutoSlideCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <div className="mt-3 mb-3 bg-white">
      {" "}
      <Carousel
        // height={100}

        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.play}
        onMouseLeave={autoplay.current.play}
        onClick={autoplay.current.play}
        onSlideChange={autoplay.current.play}
        previousControlIcon={
          <MdOutlineNavigateBefore
            size={20}
            className="bg-[#f8f8f8ec] w-6  h-10 rounded-full border-2 text-gray-600"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="bg-[#f8f8f8ec] w-6 h-10    rounded-full  border-2 text-gray-600"
          />
        }
        withIndicators
      >
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/1.png"
              className="md:h-full h-36 w-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/2.png"
              className="md:h-full h-36 w-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/3.png"
              className="md:h-full h-36 w-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/4.png"
              className="md:h-full h-36  w-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default AdAutoSlideCarousel;
