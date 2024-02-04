import { useState } from "react"
import FilterSection from "./components/FilterSection"
import ProductListSection from "./components/ProductListSection"

const AllProducts = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <>
      <div className="container mx-auto grid grid-cols-12  gap-x-2 gap-y-2 p-2">
        {/** Filter Section */}
        <section className="md:col-span-4  lg:col-span-2 ">
          <FilterSection
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </section>

        {/** Products Listing Section */}
        <section className="col-span-12  bg-white md:col-span-8 lg:col-span-10">
          <ProductListSection setIsOpenSidebar={setIsOpenSidebar} />
        </section>
      </div>
    </>
  )
}

export default AllProducts
