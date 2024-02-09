import { Carousel } from "@mantine/carousel"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"
import ProductCard from "./ProductCard"

const products = [
  {
    image: "/productsIMG/Phones/2.png",
    name: "Apple iPhone 13",
    rating: 4.5,
    reviewCount: 100,
    price: 10000,
    StrikePrice: 12000,
    discount: 20,
  },
  {
    image: "/productsIMG/Headphone/1.jpg",
    name: "Boat Headphone",
    rating: 4.8,
    reviewCount: 170,
    price: 1000,
    StrikePrice: 1200,
    discount: 20,
  },
  {
    image: "/productsIMG/scent/1.jpg",
    name: "Scents",
    rating: 4.9,
    reviewCount: 190,
    price: 300,
    StrikePrice: 500,
    discount: 20,
  },
  {
    image: "/productsIMG/Shoes/1.jpg",
    name: "Stylish Shoes",
    rating: 4.6,
    reviewCount: 200,
    price: 600,
    StrikePrice: 700,
    discount: 10,
  },
  {
    image: "/productsIMG/Toys/1.jpg",
    name: "Kids Toys",
    rating: 4.4,
    reviewCount: 210,
    price: 700,
    StrikePrice: 800,
    discount: 10,
  },
  {
    image: "/productsIMG/TV/1.jpg",
    name: "Smart Tv",
    rating: 4.3,
    reviewCount: 220,
    price: 80000,
    StrikePrice: 90000,
    discount: 10,
  },
  {
    image: "/productsIMG/Cap/1.jpg",
    name: "Stylish Cap",
    rating: 4.2,
    reviewCount: 230,
    price: 100,
    StrikePrice: 200,
    discount: 20,
  },
  {
    image: "/productsIMG/Bags/1.jpg",
    name: "College Bag",
    rating: 4.1,
    reviewCount: 240,
    price: 800,
    StrikePrice: 1000,
    discount: 20,
  },
]
const HorizontalProductCarousel = ({
  title = "",
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
        {products.map((product, i) => (
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
