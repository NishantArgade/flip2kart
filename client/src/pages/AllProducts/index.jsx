import { Accordion, Checkbox, Drawer, Radio, RangeSlider } from "@mantine/core"
import { useEffect, useState } from "react"
import { GoSortDesc } from "react-icons/go"
import { IoArrowBack } from "react-icons/io5"
import { LuSettings2 } from "react-icons/lu"
import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"

const AllProducts = () => {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [filterPriceRange, setFilterPriceRange] = useState([0, 500])
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [sortByActiveLink, setSortByActiveLink] = useState("")
  const [isAcitveSortByMobileDrawer, setIsAcitveSortByMobileDrawer] =
    useState(false)

  function getFilterPriceRange() {
    let options = []
    for (let i = 0; i <= priceRange[1]; i += 100) {
      options.push(<option value={i}>{i}</option>)
    }
    return options
  }

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

  return (
    <>
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

      <div className="container mx-auto">
        <div className="grid grid-cols-12  gap-x-2 gap-y-2 p-2">
          {/** Filter Section */}
          <div className="md:col-span-4  lg:col-span-2 ">
            <div
              className={`${
                isOpenSidebar
                  ? "translate-x-0"
                  : "translate-x-full md:-translate-x-0"
              } fixed left-0 top-0 z-50 col-span-12 h-screen w-full rounded-md border-2 border-gray-200 bg-gray-100 transition-all duration-500 ease-in-out md:static md:col-span-4  md:h-full   md:w-full md:rounded-sm md:border-0 md:bg-none lg:col-span-2`}
            >
              <div className="col-span-2 h-fit bg-white">
                <div className="col-span-2 h-auto bg-white">
                  <p className="flex  items-center justify-between border-b-2 border-gray-200 p-2 text-start text-gray-800">
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        className="self-start text-gray-500 md:hidden "
                        onClick={() => setIsOpenSidebar(false)}
                      >
                        <IoArrowBack size={25} />
                      </button>
                      <span>Filters</span>
                    </div>
                    <span className="cursor-pointer text-[0.6rem] font-semibold text-blue-500 ">
                      CLEAR ALL
                    </span>
                  </p>

                  <div className="mt-2 border-b-2 border-gray-100 p-2 pb-4">
                    <RangeSlider
                      size={"sm"}
                      min={priceRange[0]}
                      max={priceRange[1]}
                      step={100}
                      value={[filterPriceRange[0], filterPriceRange[1]]}
                      onChange={(value) => setFilterPriceRange(value)}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <select
                        value={filterPriceRange[0]}
                        className="w-[5rem] cursor-pointer rounded-sm border-2 bg-white p-1 text-xs outline-blue-500"
                        onChange={(e) => {
                          setFilterPriceRange([
                            Number(e.target.value),
                            filterPriceRange[1],
                          ])
                        }}
                      >
                        {getFilterPriceRange()}
                      </select>
                      <span className="px-1 text-xs text-gray-400">to</span>
                      <select
                        value={filterPriceRange[1]}
                        className="w-[5rem] cursor-pointer rounded-sm border-2  bg-white p-1 text-xs outline-blue-500"
                        onChange={(e) => {
                          setFilterPriceRange([
                            filterPriceRange[0],
                            Number(e.target.value),
                          ])
                        }}
                      >
                        {getFilterPriceRange()}
                      </select>
                    </div>
                  </div>

                  <Accordion multiple={true}>
                    {" "}
                    <Accordion.Item value={"BRAND"}>
                      <Accordion.Control className="text-xs font-bold text-gray-800">
                        BRAND
                      </Accordion.Control>
                      <Accordion.Panel className="text-xs">
                        <div className="flex cursor-pointer items-center justify-start gap-x-2 ">
                          <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                            x
                          </span>
                          <span className="text-gray-500">Clear All</span>
                        </div>
                        <Checkbox size="xs" label="Noise" className="mt-3" />
                        <Checkbox size="xs" label="Boat" className="mt-3" />
                        <Checkbox size="xs" label="Boult" className="mt-3" />
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value={"CUSTOMER RATINGS"}>
                      <Accordion.Control className="text-xs font-bold text-gray-800">
                        CUSTOMER RATINGS
                      </Accordion.Control>
                      <Accordion.Panel className="text-xs">
                        <div className="flex cursor-pointer items-center justify-start gap-x-2 ">
                          <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                            x
                          </span>
                          <span className="text-gray-500">Clear All</span>
                        </div>
                        <Checkbox
                          size="xs"
                          label="4★ & above"
                          className="mt-3"
                        />
                        <Checkbox
                          size="xs"
                          label="3★ & above"
                          className="mt-3"
                        />
                        <Checkbox
                          size="xs"
                          label="2★ & above"
                          className="mt-3"
                        />
                        <Checkbox
                          size="xs"
                          label="1★ & above"
                          className="mt-3"
                        />
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value={"DISCOUNT"}>
                      <Accordion.Control className="text-xs font-bold text-gray-800">
                        DISCOUNT
                      </Accordion.Control>
                      <Accordion.Panel className="text-xs">
                        <div className="flex cursor-pointer items-center justify-start gap-x-2 ">
                          <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                            x
                          </span>
                          <span className="text-gray-500">Clear All</span>
                        </div>
                        <Checkbox
                          size="xs"
                          label="40% or more"
                          className="mt-3"
                        />
                        <Checkbox
                          size="xs"
                          label="30% or more"
                          className="mt-3"
                        />
                        <Checkbox
                          size="xs"
                          label="20% or more"
                          className="mt-3"
                        />
                        <Checkbox
                          size="xs"
                          label="10% or more"
                          className="mt-3"
                        />{" "}
                        <Checkbox
                          size="xs"
                          disabled
                          label="10% or below"
                          className="mt-3"
                        />{" "}
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value={"AVAILABILITY"}>
                      <Accordion.Control className="text-xs font-bold text-gray-800">
                        AVAILABILITY
                      </Accordion.Control>
                      <Accordion.Panel className="text-xs">
                        <div className="flex cursor-pointer items-center justify-start gap-x-2 ">
                          <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                            x
                          </span>
                          <span className="text-gray-500">Clear All</span>
                        </div>
                        <Checkbox
                          size="xs"
                          label="Exclude Out of Stock"
                          className="mt-3"
                        />{" "}
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/** Products Listing Section */}
          <div className="col-span-12  bg-white md:col-span-8 lg:col-span-10">
            <div className="hidden items-center justify-start gap-4 p-2 text-xs  text-gray-600 md:flex">
              <p className="pb-1  font-semibold"> Sort By </p>
              <SortLink name={"Popularity"} link={"?sort=popularity"} />
              <SortLink
                name={"Price -- Low to High"}
                link={"?sort=low-to-high"}
              />
              <SortLink
                name={"Price -- High to Low"}
                link={"?sort=high-to-low"}
              />
              <SortLink name={"Newest First"} link={"?sort=newest-first"} />
            </div>

            {/* products grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6 ">
              {Array.from({ length: 200 }).map((product, index) => (
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
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts
