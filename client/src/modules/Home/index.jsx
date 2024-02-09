import HorizontalProductCarousel from "../../components/HorizontalProductCarousel"
import AdCarousel from "./AdCarousel.jsx"
import ProductCategories from "./ProductCategories.jsx"

const Home = () => {
  return (
    <div className="container mx-auto">
      <ProductCategories />
      <AdCarousel />
      <HorizontalProductCarousel
        title="Suggested for you"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
      />
      <HorizontalProductCarousel
        title="Recommanded"
        showRating={false}
        showStrikePrice={false}
        showDiscount={true}
      />
    </div>
  )
}

export default Home
