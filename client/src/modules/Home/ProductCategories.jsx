import { useQuery } from "@tanstack/react-query"
import ProductCategoryCard from "./components/ProductCategoryCard"
import { getAllCategoriesAndBrands } from "../../api/categoryApi"

const ProductCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategoriesAndBrands,
  })

  if (isLoading) return null

  return (
    <div className="bg-white  shadow-md">
      <div className="px-2 md:px-8 lg:px-28">
        <div className="thin-scrollbar flex cursor-pointer items-center justify-around overflow-x-auto py-2">
          {data?.categories?.map((category, index) => (
            <ProductCategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCategories
