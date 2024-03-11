import { Carousel } from "@mantine/carousel"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"
import ProductCard from "./ProductCard"
import { getAllProducts, getProductsByCategory } from "../../api/productApi"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

const HorizontalProductCarousel = ({
  title = "",
  showRating = true,
  showStrikePrice = true,
  showDiscount = true,
  category = "",
  productID = "",
}) => {
  const { data } = useQuery({
    queryKey: ["productsByCategory" + category],
    queryFn: () => getProductsByCategory(category),
  })

  const products = useMemo(() => {
    return data?.products?.filter((product) => product._id != productID)
  }, [data?.products, productID])

  if (products?.length === 0) return null

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
        loop
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
