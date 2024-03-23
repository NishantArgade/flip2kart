import { Accordion, Checkbox, RangeSlider } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { IoArrowBack } from "react-icons/io5"
import Skeleton from "react-loading-skeleton"
import { getBrandsByCategory } from "../../api/categoryApi"
import { IoSearch } from "react-icons/io5"
import SearchInput from "./components/SearchInput"

const Filter = ({
  isOpenSidebar,
  setIsOpenSidebar,
  category,
  name,
  selectedBrands,
  setSelectedBrands,
  selectedRatings,
  setSelectedRatings,
  filterPriceRange,
  setFilterPriceRange,
  selectedDiscount,
  selectedAvailability,
  setSelectedAvailability,
  setSelectedDiscount,
  selectedDelivery,
  setSelectedDelivery,
  setActivePage,
  isProductDataLoading,
}) => {
  const [accordionValue, setAccordionValue] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showMoreFilterOption, setShowMoreFilterOption] = useState(false)
  const [showMoreBrands, setShowMoreBrands] = useState(false)

  // Search Brand States
  const [brandsList, setBrandsList] = useState([])
  const [searchBrandValue, setSearchBrandValue] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["getBrandsByCategory", category, name],
    queryFn: async () => await getBrandsByCategory(category, name),
  })

  const getMinRangeOptions = useMemo(() => {
    let step = Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1)
    let ranges = []

    for (let i = data?.priceRange?.min; i <= data?.priceRange?.max; i += step) {
      ranges.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return ranges
  }, [data?.priceRange?.min, data?.priceRange?.max])

  const getMaxRangeOptions = useMemo(() => {
    let step = Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1)
    let ranges = []

    for (let i = data?.priceRange?.min; i <= data?.priceRange?.max; i += step) {
      ranges.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }

    ranges.push(
      <option
        key={data?.priceRange?.max + 1}
        value={
          data?.priceRange?.max +
          Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1)
        }
      >
        {`${data?.priceRange?.max}+`}
      </option>
    )
    return ranges
  }, [data?.priceRange?.min, data?.priceRange?.max])

  const shouldShowClearRangeFilterBtn = useMemo(() => {
    return (
      filterPriceRange[0] !== priceRange[0] ||
      (filterPriceRange[1] !== 0 &&
        data?.priceRange?.min &&
        data?.priceRange?.max &&
        filterPriceRange[1] !==
          data?.priceRange?.max +
            Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1))
    )
  }, [filterPriceRange[0], filterPriceRange[1], priceRange[0], priceRange[1]])

  const shouldShowClearAllFilterButton = useMemo(() => {
    return (
      selectedBrands.length > 0 ||
      selectedDiscount.length > 0 ||
      selectedRatings.length > 0 ||
      !!selectedAvailability ||
      !!selectedDelivery ||
      shouldShowClearRangeFilterBtn
    )
  }, [
    selectedBrands,
    selectedAvailability,
    selectedDiscount,
    selectedRatings,
    selectedDelivery,
    shouldShowClearRangeFilterBtn,
  ])

  const fitlerCount = useMemo(() => {
    return (
      selectedBrands.length +
      selectedDiscount.length +
      selectedRatings.length +
      (selectedAvailability ? 1 : 0) +
      (selectedDelivery ? 1 : 0) +
      (shouldShowClearRangeFilterBtn ? 1 : 0)
    )
  }, [
    selectedBrands,
    selectedAvailability,
    selectedDiscount,
    selectedRatings,
    selectedDelivery,
    shouldShowClearRangeFilterBtn,
  ])

  function onBrandCheckboxClick(brand, isChecked) {
    let newSelectedBrands

    if (isChecked) {
      // If the checkbox is checked, add the brand to the selected brands
      newSelectedBrands = [...selectedBrands, brand]
    } else {
      // If the checkbox is unchecked, remove the brand from the selected brands
      newSelectedBrands = selectedBrands.filter((b) => b !== brand)
    }

    setSelectedBrands(newSelectedBrands)

    // Update the brands query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search)
    if (newSelectedBrands.join(",").length === 0) urlParams.delete("brand")
    else urlParams.set("brand", newSelectedBrands.join(","))
    window.history.pushState({}, "", "?" + urlParams.toString())
  }

  function onRatingCheckboxClick(rating, isChecked) {
    let newSelectedRatings

    if (isChecked) {
      newSelectedRatings = [...selectedRatings, rating]
    } else {
      newSelectedRatings = selectedRatings.filter((r) => r !== rating)
    }

    // Update the selected brands state
    setSelectedRatings(newSelectedRatings)

    // Update the brands query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search)
    if (newSelectedRatings.length === 0) urlParams.delete("rating")
    else urlParams.set("rating", newSelectedRatings.join(","))
    window.history.pushState({}, "", "?" + urlParams.toString())
  }

  function onDiscountCheckboxClick(discount, isChecked) {
    let newSelectedDiscount

    if (isChecked) {
      newSelectedDiscount = [...selectedDiscount, discount]
    } else {
      newSelectedDiscount = selectedDiscount.filter((d) => d !== discount)
    }

    // Update the selected brands state
    setSelectedDiscount(newSelectedDiscount)

    // Update the brands query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search)
    if (newSelectedDiscount.length === 0) urlParams.delete("discount")
    else urlParams.set("discount", newSelectedDiscount.join(","))
    window.history.pushState({}, "", "?" + urlParams.toString())
  }

  function onAvailabilityCheckboxClick(value, isChecked) {
    setSelectedAvailability(isChecked ? value : "")

    const urlParams = new URLSearchParams(window.location.search)
    if (!isChecked) urlParams.delete("availability")
    else {
      urlParams.set("availability", value)
      urlParams.delete("page")
      setActivePage(1)
    }
    window.history.pushState({}, "", "?" + urlParams.toString())
  }

  function onDeliveryCheckboxClick() {
    let value = "a",
      isChecked = false
    setSelectedDelivery(isChecked ? value : "")

    const urlParams = new URLSearchParams(window.location.search)
    if (!isChecked) {
      urlParams.delete("delivery")
    } else {
      urlParams.set("delivery", value)
      urlParams.delete("page")
      setActivePage(1)
    }
    window.history.pushState({}, "", "?" + urlParams.toString())
  }

  function handleFilterValueChange(filterValue) {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("minPrice", filterValue[0])

    if (filterValue[1] <= priceRange[1])
      urlParams.set("maxPrice", filterValue[1])
    else urlParams.delete("maxPrice")

    window.history.pushState({}, "", "?" + urlParams.toString())
    setFilterPriceRange(filterValue)
  }

  function handleClearBrandFilter() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("brand")
    window.history.pushState({}, "", "?" + urlParams.toString())
    setSelectedBrands([])
    setSearchBrandValue("")
  }
  function handleClearRatingFilter() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("rating")
    window.history.pushState({}, "", "?" + urlParams.toString())
    setSelectedRatings([])
  }
  function handleClearDiscountFilter() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("discount")
    window.history.pushState({}, "", "?" + urlParams.toString())
    setSelectedDiscount([])
  }
  function handleClearAvailabilityFilter() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("availability")
    window.history.pushState({}, "", "?" + urlParams.toString())
    setSelectedAvailability("")
  }
  function handleClearPriceRange() {
    setPriceRange([data?.priceRange?.min, data?.priceRange?.max])
    setFilterPriceRange([
      data?.priceRange?.min,
      data?.priceRange?.max +
        Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1),
    ])
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("minPrice")
    urlParams.delete("maxPrice")
    window.history.pushState({}, "", "?" + urlParams.toString())
  }
  function handleClearAllFilters() {
    setAccordionValue([])
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("minPrice")
    urlParams.delete("maxPrice")
    urlParams.delete("brand")
    urlParams.delete("rating")
    urlParams.delete("discount")
    urlParams.delete("availability")
    urlParams.delete("delivery")
    window.history.pushState({}, "", "?" + urlParams.toString())

    setPriceRange([data?.priceRange?.min, data?.priceRange?.max])
    setFilterPriceRange([
      data?.priceRange?.min,
      data?.priceRange?.max +
        Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1),
    ])
    setSelectedBrands([])
    setSelectedRatings([])
    setSelectedDiscount([])
    setSelectedAvailability("")
    setSelectedDelivery("")
    setSearchBrandValue("")
  }

  useEffect(() => {
    if (!isLoading && data) {
      setPriceRange([data?.priceRange?.min, data?.priceRange?.max])
      setFilterPriceRange([
        data?.priceRange?.min,
        data?.priceRange?.max +
          Math.pow(10, Math.floor(Math.log10(data?.priceRange?.max)) - 1),
      ])
      setBrandsList(data?.brands)
    }
  }, [data, isLoading])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const brands = urlParams.get("brand")
      ? urlParams.get("brand").split(",")
      : []
    setSelectedBrands(brands)

    const ratings = urlParams.get("rating")
      ? urlParams.get("rating").split(",")
      : []
    setSelectedRatings(ratings.map((r) => Number(r)))

    const discounts = urlParams.get("discount")
      ? urlParams.get("discount").split(",")
      : []
    setSelectedDiscount(discounts.map((d) => Number(d)))

    const availability = urlParams.get("availability")
    setSelectedAvailability(availability)

    const delivery = urlParams.get("delivery")
    setSelectedDelivery(delivery)
  }, [])

  return (
    <div
      className={`${
        isOpenSidebar ? "translate-x-0" : "translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen  w-full rounded-md border-2 border-gray-200 bg-white transition-transform  duration-500 ease-out md:static md:col-span-4 md:h-full  md:w-full   md:rounded-sm md:border-0 md:bg-inherit  lg:col-span-2`}
    >
      <div className="col-span-2 h-auto bg-white">
        {/** Heading */}
        <div className="flex  flex-col border-b-2 border-gray-200 p-2 text-start text-gray-800">
          <div className="flex  items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <button
                className="self-start text-gray-500 md:hidden "
                onClick={() => setIsOpenSidebar(false)}
              >
                <IoArrowBack size={25} />
              </button>
              <span className="text-[0.9rem]">Filters</span>
            </div>
            {shouldShowClearAllFilterButton && (
              <button
                className="cursor-pointer text-[0.60rem] font-semibold text-blue-500"
                onClick={handleClearAllFilters}
              >
                CLEAR ALL
              </button>
            )}
          </div>
          {shouldShowClearAllFilterButton && (
            <div>
              <div
                className={`${showMoreFilterOption ? "h-full" : "h-14"} mt-2 flex flex-wrap gap-2 overflow-hidden text-xs `}
              >
                {shouldShowClearRangeFilterBtn && (
                  <button
                    className="group inline-block h-min  rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={handleClearPriceRange}
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      ₹{filterPriceRange[0]} - ₹
                      {filterPriceRange[1] ===
                      data?.priceRange?.max +
                        Math.pow(
                          10,
                          Math.floor(Math.log10(data?.priceRange?.max)) - 1
                        )
                        ? `${priceRange[1]}+`
                        : filterPriceRange[1]}
                    </span>
                  </button>
                )}
                {selectedBrands.map((brand, i) => (
                  <button
                    key={i}
                    className="group inline-block h-min  rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() => onBrandCheckboxClick(brand, false)}
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      {brand}
                    </span>
                  </button>
                ))}
                {selectedRatings.map((rate, i) => (
                  <button
                    key={i}
                    className="group inline-block h-min  rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() => onRatingCheckboxClick(rate, false)}
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      {rate}* & above
                    </span>
                  </button>
                ))}
                {selectedDiscount.map((discount, i) => (
                  <button
                    key={i}
                    className="group inline-block h-min  rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() => onDiscountCheckboxClick(discount, false)}
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      {discount}% or more
                    </span>
                  </button>
                ))}
                {!!selectedAvailability && (
                  <button
                    className="group inline-block h-min rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() =>
                      onAvailabilityCheckboxClick(selectedAvailability, false)
                    }
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      Exclude Out of Stock
                    </span>
                  </button>
                )}
                {!!selectedDelivery && (
                  <button
                    className="group inline-block h-min rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() =>
                      onDeliveryCheckboxClick(selectedDelivery, false)
                    }
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      Delivery in 1 day
                    </span>
                  </button>
                )}
              </div>
              <div>
                {fitlerCount > 3 && (
                  <button
                    className="mt-3  inline-block text-[0.65rem] font-medium uppercase text-blue-500"
                    onClick={() => setShowMoreFilterOption((prev) => !prev)}
                  >
                    {showMoreFilterOption ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/** Range Filter */}

        {!isProductDataLoading && !isLoading ? (
          <>
            <div className="mt-2 flex items-center justify-between">
              <button className="px-2 text-xs uppercase tracking-wide text-gray-800">
                Price
              </button>
              {shouldShowClearRangeFilterBtn && (
                <button
                  onClick={handleClearPriceRange}
                  className="px-2 text-[0.60rem]  font-semibold uppercase text-blue-500"
                >
                  clear
                </button>
              )}
            </div>

            {data?.priceRange?.min && data?.priceRange?.max && (
              <div className="border-b-2 border-gray-100 p-2 pb-4">
                <RangeSlider
                  size={"sm"}
                  min={priceRange[0]}
                  max={
                    priceRange[1] +
                    Math.pow(
                      10,
                      Math.floor(Math.log10(data?.priceRange?.max)) - 1
                    )
                  }
                  label={null}
                  step={Math.pow(
                    10,
                    Math.floor(Math.log10(data?.priceRange?.max)) - 1
                  )}
                  value={[filterPriceRange[0], filterPriceRange[1]]}
                  onChange={(value) => handleFilterValueChange(value)}
                />
                <div className="mt-2 flex items-center justify-between">
                  <select
                    key={"minRange"}
                    value={filterPriceRange[0]}
                    className="w-[5rem] cursor-pointer rounded-sm border-2 bg-white p-1 text-xs outline-blue-500"
                    onChange={(e) => {
                      handleFilterValueChange([
                        Number(e.target.value),
                        filterPriceRange[1],
                      ])
                    }}
                  >
                    {getMinRangeOptions}
                  </select>
                  <span className="px-1 text-xs text-gray-400">to</span>
                  <select
                    key={"maxRange"}
                    value={filterPriceRange[1]}
                    className="w-[5rem] cursor-pointer rounded-sm border-2  bg-white p-1 text-xs outline-blue-500"
                    onChange={(e) => {
                      handleFilterValueChange([
                        filterPriceRange[0],
                        Number(e.target.value),
                      ])
                    }}
                  >
                    {getMaxRangeOptions}
                  </select>
                </div>
              </div>
            )}
            <div className=" border-b-[1.5px] p-2">
              <Checkbox
                size="xs"
                label={"Delivery in 1 day"}
                onChange={onDeliveryCheckboxClick}
                className="py-1 text-xs  tracking-wide text-gray-800"
                checked={selectedDelivery === "one_day"}
                readOnly
              />
            </div>

            <Accordion
              value={accordionValue}
              onChange={(value) => setAccordionValue(value)}
              multiple={true}
            >
              {data?.brands.length > 0 && (
                <Accordion.Item value={"BRAND"}>
                  <Accordion.Control className="text-xs font-bold text-gray-800">
                    BRAND
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div
                      className={`${showMoreBrands ? "h-full" : "max-h-28"}  overflow-hidden text-xs`}
                    >
                      {selectedBrands.length > 0 && (
                        <button
                          className="mb-3 flex cursor-pointer items-center justify-start gap-x-2"
                          onClick={handleClearBrandFilter}
                        >
                          <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                            x
                          </span>
                          <span className="text-gray-500">Clear All</span>
                        </button>
                      )}

                      {data?.brands.length > 2 && (
                        <SearchInput
                          brandsList={data?.brands || []}
                          setFilteredBrands={setBrandsList}
                          searchBrandValue={searchBrandValue}
                          setSearchBrandValue={setSearchBrandValue}
                        />
                      )}

                      {brandsList.length > 0 ? (
                        brandsList.map((brand, i) => (
                          <Checkbox
                            key={brand + i}
                            size="xs"
                            label={brand}
                            className="mb-3"
                            onChange={(e) =>
                              onBrandCheckboxClick(
                                brand,
                                e.currentTarget.checked
                              )
                            }
                            checked={selectedBrands.includes(brand)}
                            readOnly
                          />
                        ))
                      ) : (
                        <div className="text-xs text-gray-400">Not Found</div>
                      )}
                    </div>
                    {brandsList.length > 3 && (
                      <button
                        className="mt-1 text-[0.60rem]  uppercase text-blue-500"
                        onClick={() => setShowMoreBrands((prev) => !prev)}
                      >
                        {showMoreBrands ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </Accordion.Panel>
                </Accordion.Item>
              )}
              <Accordion.Item value={"CUSTOMER RATINGS"}>
                <Accordion.Control className="text-xs font-bold text-gray-800">
                  CUSTOMER RATINGS
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  {selectedRatings.length > 0 && (
                    <button
                      className="mb-3 flex cursor-pointer items-center justify-start gap-x-2"
                      onClick={handleClearRatingFilter}
                    >
                      <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                        x
                      </span>
                      <span className="text-gray-500">Clear All</span>
                    </button>
                  )}
                  {[4, 3, 2, 1].map((rate) => (
                    <Checkbox
                      key={rate}
                      size="xs"
                      label={`${rate}★ & above`}
                      className="mb-3"
                      onChange={(e) =>
                        onRatingCheckboxClick(rate, e.currentTarget.checked)
                      }
                      checked={selectedRatings.includes(rate)}
                      readOnly
                    />
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value={"DISCOUNT"}>
                <Accordion.Control className="text-xs font-bold text-gray-800">
                  DISCOUNT
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  {selectedDiscount.length > 0 && (
                    <button
                      className="mb-3 flex cursor-pointer items-center justify-start gap-x-2"
                      onClick={handleClearDiscountFilter}
                    >
                      <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                        x
                      </span>
                      <span className="text-gray-500">Clear All</span>
                    </button>
                  )}
                  {[40, 30, 20, 10].map((discount) => (
                    <Checkbox
                      key={discount}
                      size="xs"
                      label={`${discount}% or more`}
                      className="mb-3"
                      onChange={(e) =>
                        onDiscountCheckboxClick(
                          discount,
                          e.currentTarget.checked
                        )
                      }
                      checked={selectedDiscount.includes(discount)}
                      readOnly
                    />
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value={"AVAILABILITY"}>
                <Accordion.Control className="text-xs font-bold text-gray-800">
                  AVAILABILITY
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  {!!selectedAvailability && (
                    <button
                      className="flex cursor-pointer items-center justify-start gap-x-2"
                      onClick={handleClearAvailabilityFilter}
                    >
                      <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                        x
                      </span>
                      <span className="text-gray-500">Clear All</span>
                    </button>
                  )}
                  <Checkbox
                    size="xs"
                    label="Exclude Out of Stock"
                    className="mt-3"
                    onChange={(e) =>
                      onAvailabilityCheckboxClick(
                        "ExcludeOutOfStock",
                        e.currentTarget.checked
                      )
                    }
                    checked={selectedAvailability === "ExcludeOutOfStock"}
                    readOnly
                  />{" "}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </>
        ) : (
          <>
            <div className="mb-2 p-1 px-2">
              <Skeleton className="my-1" height={16} />
              <div className="flex justify-between">
                <Skeleton className="my-1" height={16} width={80} />
                <Skeleton className="my-1" height={16} width={80} />
              </div>
            </div>
            {Array.from({ length: 4 }).map((item, i) => (
              <div className="p-1 px-2" key={i}>
                <Skeleton className="my-1" height={16} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Filter
