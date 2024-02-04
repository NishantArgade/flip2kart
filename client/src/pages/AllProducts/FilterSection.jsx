import { Accordion, Checkbox, RangeSlider } from "@mantine/core"
import { useState } from "react"
import { IoArrowBack } from "react-icons/io5"

const FilterSection = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const [filterPriceRange, setFilterPriceRange] = useState([0, 500])
  const [priceRange, setPriceRange] = useState([0, 500])

  function getFilterPriceRange() {
    let options = []
    for (let i = 0; i <= priceRange[1]; i += 100) {
      options.push(<option value={i}>{i}</option>)
    }
    return options
  }

  return (
    <div
      className={`${
        isOpenSidebar
          ? "translate-x-0 bg-white"
          : "translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen w-full rounded-md border-2 border-gray-200  transition-all duration-500 ease-in-out md:static md:col-span-4  md:h-full   md:w-full md:rounded-sm md:border-0 md:bg-none lg:col-span-2`}
    >
      <div className="col-span-2 h-auto bg-white">
        {/** Heading */}
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

        {/** Range Filter */}
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

        {/** Filter Options */}
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
              <Checkbox size="xs" label="4★ & above" className="mt-3" />
              <Checkbox size="xs" label="3★ & above" className="mt-3" />
              <Checkbox size="xs" label="2★ & above" className="mt-3" />
              <Checkbox size="xs" label="1★ & above" className="mt-3" />
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
              <Checkbox size="xs" label="40% or more" className="mt-3" />
              <Checkbox size="xs" label="30% or more" className="mt-3" />
              <Checkbox size="xs" label="20% or more" className="mt-3" />
              <Checkbox size="xs" label="10% or more" className="mt-3" />{" "}
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
  )
}

export default FilterSection
