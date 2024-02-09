import { Carousel } from "@mantine/carousel"
import { Image } from "@mantine/core"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"

const AdCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  return (
    <div className="mb-3 mt-3 bg-white">
      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.play}
        previousControlIcon={
          <MdOutlineNavigateBefore
            size={20}
            className="h-10 w-6  rounded-full border-2 bg-[#f8f8f8ec] text-gray-600"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="h-10 w-6 rounded-full    border-2  bg-[#f8f8f8ec] text-gray-600"
          />
        }
        withIndicators
        loop
        styles={{
          indicator: {
            backgroundColor: "gray",
            width: "1rem",
          },
        }}
      >
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/1.png"
              className="h-36 w-full md:h-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/2.png"
              className="h-36 w-full md:h-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/3.png"
              className="h-36 w-full md:h-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>
            <Image
              src="carouselImages/4.png"
              className="h-36 w-full  md:h-full"
              alt=""
            />
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  )
}

export default AdCarousel
