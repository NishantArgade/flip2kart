import MultiProductHCarousel from "../../components/MultiProductHCarousel/index.jsx"
import AdAutoSlideCarousel from "./components/AdAutoSlideCarousel"
import ProductCategoryCards from "./components/ProductCategoryCards"

const Home = () => {
  return (
    <div className="container mx-auto">
      <ProductCategoryCards />
      <AdAutoSlideCarousel />
      <MultiProductHCarousel
        title="Suggested for you"
        showRating={false}
        showStrikePrice={true}
        showDiscount={false}
      />
      <MultiProductHCarousel
        title="Recommanded"
        showRating={false}
        showStrikePrice={false}
        showDiscount={true}
      />
    </div>
  )
}

export default Home
