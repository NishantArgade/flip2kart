import { useQuery } from "@tanstack/react-query"
import HorizontalProductCarousel from "../../components/HorizontalProductCarousel"
import AdCarousel from "./AdCarousel.jsx"
import ProductCategories from "./ProductCategories.jsx"
import { getProductsByCategory } from "../../api/productApi.js"
import Spinner from "../../components/Spinner.jsx"

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: getProductsByCategory,
  })

  return (
    <div className="container mx-auto">
      <ProductCategories />
      <AdCarousel />
      {!isLoading ? (
        Object.entries(data?.products)?.map(([category, value], i) => {
          return (
            <HorizontalProductCarousel
              key={i}
              title={value?.title}
              products={value?.products}
              showRating={false}
              showStrikePrice={true}
              showDiscount={false}
            />
          )
        })
      ) : (
        <div className="container mx-auto my-2 flex h-60 items-center justify-center bg-white p-2 shadow-md">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Home
