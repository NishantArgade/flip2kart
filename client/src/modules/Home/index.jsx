import HorizontalProductCarousel from "../../components/HorizontalProductCarousel"
import AdCarousel from "./AdCarousel.jsx"
import ProductCategories from "./ProductCategories.jsx"

const Home = () => {
  return (
    <div className="container mx-auto">
      <ProductCategories />
      <AdCarousel />
      <HorizontalProductCarousel
        title="More to Explore"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
        category={"Mobile"}
      />
      <HorizontalProductCarousel
        title="Fashipn Best Sellers"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
        category={"headphones"}
      />
      <HorizontalProductCarousel
        title="Super Hit Deals on Fashion"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
        category={"Clothes"}
      />
      {/* <HorizontalProductCarousel
        title="Top Deals On Appliances"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
        category={"Clothes"}
      /> */}
      <HorizontalProductCarousel
        title="Recommanded Items"
        showRating={false}
        showStrikePrice={false}
        showDiscount={true}
        category={"Laptop"}
      />
    </div>
  )
}

export default Home
