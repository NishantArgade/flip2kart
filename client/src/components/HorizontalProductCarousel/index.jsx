import { Carousel } from "@mantine/carousel"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"
import ProductCard from "./ProductCard"

const HorizontalProductCarousel = ({
  title = "",
  products = [],
  showRating = true,
  showStrikePrice = true,
  showDiscount = true,
}) => {
  return (
    <div className="container mx-auto my-2  bg-white p-2 shadow-md">
      <p className="pb-4 pl-2 pt-3 text-sm font-semibold text-gray-700 md:text-lg">
        {title}
      </p>

      <Carousel
        withIndicators
        height={300}
        slideSize="16.66%"
        slideGap="xs"
        loop={false}
        align="start"
        slidesToScroll={6}
        previousControlIcon={
          <MdOutlineNavigateBefore
            size={20}
            className="h-6 w-6 rounded-full border-2 border-gray-300 bg-[#dededeec] text-gray-700"
          />
        }
        nextControlIcon={
          <MdOutlineNavigateNext
            size={20}
            className="h-6 w-6 rounded-full  border-2 border-gray-300 bg-[#dededeec] text-gray-700"
          />
        }
      >
        {products?.map((product, i) => (
          <Carousel.Slide key={i}>
            <ProductCard
              showRating={showRating}
              showStrikePrice={showStrikePrice}
              showDiscount={showDiscount}
              product={product}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

export default HorizontalProductCarousel
