import MultiProductHCarousel from "../../components/MultiProductHCarousel/index.jsx"
import AdAutoSlideCarousel from "./AdAutoSlideCarousel.jsx"
import ProductCategoryCardsSection from "./ProductCategoryCardSection/index.jsx"

const Home = () => {
  return (
    <div className="container mx-auto">
      <ProductCategoryCardsSection />
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
