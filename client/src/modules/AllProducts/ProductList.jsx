import { Drawer, Radio } from "@mantine/core"
import { useEffect, useState } from "react"
import { GoSortDesc } from "react-icons/go"
import { LuSettings2 } from "react-icons/lu"
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner"

const ProductCard = ({ product }) => {
  return (
    <Link
      to="/product-detail/1"
      className="flex   w-full cursor-pointer flex-col items-start justify-start rounded-sm border-2 border-gray-100 px-2 py-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <div className=" w-full ">
        <div className="bg-green-20 bg-pink-30 my-2 flex h-44 w-full flex-col items-center justify-center md:h-40 lg:h-56">
          <img src={product?.image} className="h-auto w-40" alt="" />
        </div>
      </div>
      <div className="mt-2 flex flex-col justify-between gap-y-1">
        <p className="text-sm">{product?.name}</p>
        <p className="line-clamp-4 text-xs  text-gray-500">
          {product?.description}
        </p>
        <p className="text-sm font-bold">₹{product?.price}</p>
        <p className="text-xs font-semibold">
          {product?.deliveryCharges !== 0
            ? `₹${product?.deliveryCharges} delivery charge`
            : "free delivery"}
        </p>
        <p className="text-xs font-semibold text-pink-600">
          {product?.quantity <= 10 && "only few left"}
        </p>
      </div>
    </Link>
  )
}

const ProductList = ({ setIsOpenSidebar }) => {
  const [sortByActiveLink, setSortByActiveLink] = useState("")
  const [isAcitveSortByMobileDrawer, setIsAcitveSortByMobileDrawer] =
    useState(false)

  useEffect(() => {
    setSortByActiveLink(window.location.search)
  }, [])

  const SortLink = ({ name, link }) => {
    return (
      <div
        className="flex  justify-between "
        onClick={() => setSortByActiveLink(link)}
      >
        <Link
          to={link}
          className={
            sortByActiveLink === link
              ? "pb-1  md:border-b-2 md:border-blue-500 md:text-blue-600 "
              : "pb-1"
          }
        >
          {name}
        </Link>
        <Radio className="md:hidden" checked={sortByActiveLink === link} />
      </div>
    )
  }

  const isLoading = false

  return (
    <>
      {/** Sort By Drawer For Small Screens */}
      <Drawer
        opened={isAcitveSortByMobileDrawer}
        position="bottom"
        size={220}
        onClose={setIsAcitveSortByMobileDrawer}
        title="Sort By"
      >
        {/* Drawer content */}
        <div className="flex flex-col gap-2">
          <SortLink name={"Popularity"} link={"?sort=popularity"} />
          <SortLink name={"Price -- Low to High"} link={"?sort=low-to-high"} />
          <SortLink name={"Price -- High to Low"} link={"?sort=high-to-low"} />
          <SortLink name={"Newest First"} link={"?sort=newest-first"} />
        </div>
      </Drawer>

      {/* Sort and Filter Heading for Small Devices */}
      <div className="fixed left-0 top-[6.2rem] flex w-full border-b-4 bg-white px-2 pb-2 pt-3 md:hidden">
        <div className="flex w-full  items-center justify-center gap-2 border-r-2 ">
          <GoSortDesc
            className="cursor-pointer text-gray-500 "
            onClick={() => setIsAcitveSortByMobileDrawer(true)}
            size={24}
          />
          <p>Sort</p>
        </div>

        <div className="flex w-full  items-center justify-center gap-2">
          <LuSettings2
            className="cursor-pointer text-gray-500"
            onClick={() => setIsOpenSidebar(true)}
            size={24}
          />
          <p>Filter</p>
        </div>
      </div>

      {/* Sort By Options Heading For Large Screens*/}
      <div className="hidden items-center justify-start gap-4 p-2 text-xs  text-gray-600 md:flex">
        <p className="pb-1  font-semibold"> Sort By </p>
        <SortLink name={"Popularity"} link={"?sort=popularity"} />
        <SortLink name={"Price -- Low to High"} link={"?sort=low-to-high"} />
        <SortLink name={"Price -- High to Low"} link={"?sort=high-to-low"} />
        <SortLink name={"Newest First"} link={"?sort=newest-first"} />
      </div>

      {/* Products List */}
      <div className="relative">
        <div
          className={`${isLoading ? "opacity-50" : "opacity-100"} grid grid-cols-2 gap-x-2 gap-y-4 px-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6`}
        >
          {Array.from({ length: 40 }).map((product, index) => (
            <ProductCard
              key={index}
              product={{
                name: "Canon Camera",
                image: "/camera.png",
                description:
                  "Lorem Invidunt sit no et ipsum kasd rebum clita. Duo sanctus duo tempor clita aliquyam, eos dolores dolore nonumy no lorem.",
                price: 3000,
                stock: 440,
                deliveryCharges: 0,
                quantity: 30,
              }}
            />
          ))}
        </div>
        <div
          className={`${isLoading ? "block" : "hidden"} absolute left-1/2 top-52 z-10 -translate-x-1/2`}
        >
          <Spinner />
        </div>
      </div>
    </>
  )
}

export default ProductList
