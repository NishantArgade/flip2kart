import { Carousel } from "@mantine/carousel";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const SmallDeviceIMGCarousel = () => {
  return (
    <div className="md:hidden">
      <Carousel
        withIndicators
        loop
        styles={{
          indicator: {
            backgroundColor: "gray",
          },
        }}
        previousControlIcon={
          <MdOutlineNavigateBefore
            size={20}
            className="bg-[#f8f8f8ec] w-6  h-6 rounded-full border-2 text-gray-600"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="bg-[#f8f8f8ec] w-6 h-6  rounded-full  border-2 text-gray-600"
          />
        }
      >
        {["/camera.png", "/shirt.png", "/book.png"].map((url) => (
          <Carousel.Slide
            key={url}
            className="flex items-center justify-center p-1"
          >
            <img src={url} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default SmallDeviceIMGCarousel;
