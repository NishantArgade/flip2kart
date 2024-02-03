import { Carousel } from "@mantine/carousel";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import ProductCard from "./ProductCard";

const MultiProductHCarousel = ({
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
            className="bg-[#dededeec] w-6 h-6 border-gray-300 rounded-full border-2 text-gray-700"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="bg-[#dededeec] h-6 w-6  border-gray-300 rounded-full border-2 text-gray-700"
          />
        }
      >
        {Array.from({ length: 20 }).map((i) => (
          <Carousel.Slide key={i}>
            <ProductCard
              showRating={showRating}
              showStrikePrice={showStrikePrice}
              showDiscount={showDiscount}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default MultiProductHCarousel;
