import { useEffect, useState } from "react"
import FilterSection from "./Filter"
import ProductListSection from "./ProductList"
import { useLocation } from "react-router-dom"
import { getFilteredProducts } from "../../api/productApi"
import { useQuery } from "@tanstack/react-query"

const AllProducts = () => {
  const location = useLocation()
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedDiscount, setSelectedDiscount] = useState([])
  const [selectedAvailability, setSelectedAvailability] = useState("")
  const [selectedSort, setSelectedSort] = useState("")
  const [selectedDelivery, setSelectedDelivery] = useState("")
  const [filterPriceRange, setFilterPriceRange] = useState([0, 0])

  const [activePage, setActivePage] = useState(1)

  const searchParams = new URLSearchParams(location.search)
  const category = searchParams.get("category") // gets the value of the 'category' query parameter
  const brand = searchParams.get("brand") // gets the value of the 'category' query parameter

  const { data, isLoading } = useQuery({
    queryKey: [
      "filteredProducts",
      selectedBrands,
      selectedRatings,
      selectedDiscount,
      selectedAvailability,
      selectedSort,
      filterPriceRange,
      selectedDelivery,
      activePage,
    ],
    queryFn: async () => await getFilteredProducts(window.location.search),
  })

  useEffect(() => {
    if (!isLoading && data) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }
  }, [data, isLoading])

  return (
    <>
      <div className="container mx-auto grid grid-cols-12  gap-x-2 gap-y-2 md:p-2">
        {/** Filter Section */}
        <section className="md:col-span-4  lg:col-span-2 ">
          <FilterSection
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
            category={category}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            filterPriceRange={filterPriceRange}
            setFilterPriceRange={setFilterPriceRange}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
          />
        </section>

        {/** Products Listing Section */}
        <section className="col-span-12 mb-4  min-h-screen bg-white pb-3 md:col-span-8 lg:col-span-10">
          <ProductListSection
            setIsOpenSidebar={setIsOpenSidebar}
            category={category}
            brand={brand}
            data={data}
            products={data?.products}
            isLoading={isLoading}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            totalPages={data?.totalPages}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </section>
      </div>
    </>
  )
}

export default AllProducts
