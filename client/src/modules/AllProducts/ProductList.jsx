import { Drawer, Radio, darken } from "@mantine/core"
import { useEffect, useState } from "react"
import { GoSortDesc } from "react-icons/go"
import { LuSettings2 } from "react-icons/lu"
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { useMutation } from "@tanstack/react-query"
import { toggleProductFromWishlist } from "../../api/productApi"
import { IoMdHeart } from "react-icons/io"
import { queryClient } from "../../main"
import { useSelector } from "react-redux"
import { calculateDiscountedPrice } from "../../utils/helper"
import moment from "moment"
import Pagination from "../../components/Pagination"

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.user.data)

  const { mutate, isPending } = useMutation({
    mutationKey: "toggleProductFromWishlist",
    mutationFn: toggleProductFromWishlist,
    onSuccess: () => queryClient.invalidateQueries("checkAuth"),
  })

  function handleAddToWishlist(product) {
    mutate(product)
  }

  function getDiliveryStatusText(day) {
    if (day > 7) return null

    if (day >= 2) return moment().add(day, "days").format("Do MMM")

    let date = moment().add(day, "days") // tomorrow's date

    let formattedDate = date.calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow], dddd",
    })

    return formattedDate
  }
  return (
    <div className="relative z-0 flex   w-full cursor-pointer flex-col items-start justify-start rounded-sm border-2 border-gray-100 px-1 py-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:px-2">
      <Link to={`/product-detail/${product?._id}`}>
        <div className=" flex w-full items-center justify-center">
          <div className="bg-green-20 bg-pink-30 my-2  h-32 w-[8.5rem] md:h-44 md:w-44 ">
            <img
              src={product?.images.length > 0 && product?.images[0]?.url}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-between gap-y-1">
          <p className="line-clamp-2 text-xs">{product?.name}</p>
          <div className="flex items-center gap-x-2 text-xs text-gray-700">
            {product?.overall_rating > 0 ? (
              <>
                <p
                  className={`${product?.overall_rating == 1 ? "bg-red-400" : product?.overall_rating == 2 ? "bg-orange-400" : "bg-green-600"}  rounded-sm px-[6px]  text-[0.65rem] text-white`}
                >
                  {product?.overall_rating}★
                </p>
                <p className=" font-medium text-gray-500">
                  ({product?.rating_count})
                </p>
              </>
            ) : (
              <div className="text-gray-500">No ratings yet</div>
            )}

            <div className="w-14">
              <img
                src="/assured.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
          </div>
          <div className="mt-1 flex flex-wrap items-center justify-start gap-2 text-[0.8rem]  md:flex  md:text-[0.9rem]">
            <span className="font-bold">
              ₹
              {calculateDiscountedPrice(
                product?.price,
                product?.discount
              ).toLocaleString("en-IN")}
            </span>
            {product?.price && (
              <strike className="text-xs text-gray-700">
                ₹{product?.price}
              </strike>
            )}
            {product?.discount && (
              <span className="text-xs text-green-600">
                {product?.discount}% off
              </span>
            )}
          </div>
          {product?.stock !== 0 && product?.price >= 200 && (
            <p className="text-xs">
              free delivery
              {product?.delivery_estimate_days <= 7 && " by "}
              <strong>
                {getDiliveryStatusText(product?.delivery_estimate_days)}
              </strong>
            </p>
          )}
          {product?.stock === 0 && (
            <p className="text-xs font-medium text-pink-600">
              currently out of stock
            </p>
          )}
          {product?.stock >= 1 && product?.stock <= 10 && (
            <p className="text-xs font-medium text-pink-600">only few left</p>
          )}
          {product?.stock !== 0 && product?.discount >= 50 && (
            <p className="text-[0.65rem] font-medium text-violet-500">
              Big Saving Deal
            </p>
          )}
        </div>
      </Link>
      <button onClick={() => handleAddToWishlist(product)} disabled={isPending}>
        <IoMdHeart
          className={`${user?.wishlist?.includes(product?._id) ? "text-red-500" : "text-gray-300"} cursor-pointerp-1 absolute right-1 top-1 z-10 md:right-2 md:top-2 `}
          size={23}
        />
      </button>
    </div>
  )
}

const ProductList = ({
  setIsOpenSidebar,
  category,
  brand,
  products = [],
  isLoading,
  selectedSort,
  setSelectedSort,
  totalPages,
  activePage,
  setActivePage,
  data,
}) => {
  const [isAcitveSortByMobileDrawer, setIsAcitveSortByMobileDrawer] =
    useState(false)

  function onSelectSortClick(sortName) {
    setSelectedSort(sortName)

    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("sort", sortName)
    window.history.pushState({}, "", "?" + urlParams.toString())
  }

  const SortLink = ({ name, link }) => {
    return (
      <button
        className="flex  justify-between "
        onClick={() => onSelectSortClick(link)}
      >
        <p
          className={
            selectedSort === link
              ? "pb-1  md:border-b-2 md:border-blue-500 md:text-blue-600 "
              : "pb-1"
          }
        >
          {name}
        </p>
        <Radio
          className="md:hidden"
          defaultChecked={selectedSort === link}
          readOnly
        />
      </button>
    )
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    let sort = "popularity"
    if (urlParams.get("sort")) sort = urlParams.get("sort")
    else {
      urlParams.set("sort", "popularity")
      window.history.pushState({}, "", "?" + urlParams.toString())
    }
    setSelectedSort(sort)
  }, [])

  if (!isLoading && products?.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-y-2">
        <img src="/searchNotFound.png" alt="" />
        <p className="mt-3 text-xl font-medium"> Sorry, no results found! </p>
        <p className="text-gray-500">
          Please check the spelling or try searching for something else
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-start">
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
          <SortLink name={"Popularity"} link={"popularity"} />
          <SortLink name={"Price -- Low to High"} link={"price-low-to-high"} />
          <SortLink name={"Price -- High to Low"} link={"price-high-to-low"} />
          <SortLink name={"Newest First"} link={"newest-first"} />
        </div>
      </Drawer>

      {!isLoading && (
        <div className="mb-3">
          <div className="flex items-center justify-start gap-2 px-2 pt-2">
            <p className="text-xs">{category}</p>
            <p className="text-[0.63rem] text-gray-500">
              (Showing {data?.start} – {data?.end} products of{" "}
              {data?.totalProductsCount} products)
            </p>
          </div>

          {/* Sort and Filter Heading for Small Devices */}
          <div className="fixed left-0 top-[6.2rem] z-10 flex w-full border-b-4 bg-white px-2 pb-2 pt-3 md:hidden">
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
            <SortLink name={"Popularity"} link={"popularity"} />
            <SortLink
              name={"Price -- Low to High"}
              link={"price-low-to-high"}
            />
            <SortLink
              name={"Price -- High to Low"}
              link={"price-high-to-low"}
            />
            <SortLink name={"Newest First"} link={"newest-first"} />
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="relative mb-6 flex-grow">
        <div
          className={`${isLoading ? "opacity-50" : "opacity-100"} grid grid-cols-2 gap-x-2 gap-y-4 px-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6`}
        >
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <div
          className={`${isLoading ? "block" : "hidden"} absolute left-1/2 top-52 z-10 -translate-x-1/2`}
        >
          <Spinner />
        </div>
      </div>

      {!isLoading && (
        <Pagination
          totalPages={totalPages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  )
}

export default ProductList
