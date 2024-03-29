import { Carousel } from "@mantine/carousel"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"

const SmallDeviceIMGCarousel = ({ images }) => {
  return (
    <div className="md:hidden">
      <Carousel
        withIndicators
        loop={false}
        styles={{
          indicator: {
            backgroundColor: "gray",
          },
        }}
        previousControlIcon={
          <MdOutlineNavigateBefore
            size={20}
            className="h-6 w-6  rounded-full border-2 bg-[#f8f8f8ec] text-gray-600"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="h-6 w-6 rounded-full  border-2  bg-[#f8f8f8ec] text-gray-600"
          />
        }
      >
        {images?.map((item, index) => (
          <Carousel.Slide
            key={index}
            className="flex h-64 w-full items-center justify-center px-4 pt-4"
          >
            <img src={item?.url} className="h-full w-full object-contain" />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

export default SmallDeviceIMGCarousel
