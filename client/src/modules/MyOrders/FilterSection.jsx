import { Accordion, Checkbox } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { IoArrowBack } from "react-icons/io5"
import Skeleton from "react-loading-skeleton"

const FilterSection = ({
  isOpenSidebar,
  setIsOpenSidebar,
  selectedOrderStatus,
  setSelectedOrderStatus,
  selectedOrderTime,
  setSelectedOrderTime,
  accordionValue,
  setAccordionValue,
  isLoading,
}) => {
  const [showMoreFilterOption, setShowMoreFilterOption] = useState(false)

  const date = new Date()
  const currentYear = date.getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i)

  function onOrderStatusCheckboxClick(status, isChecked) {
    let newSelectedOrderStatus = []

    if (isChecked) {
      newSelectedOrderStatus = [...selectedOrderStatus, status]
    } else {
      newSelectedOrderStatus = selectedOrderStatus.filter((o) => o !== status)
    }

    setSelectedOrderStatus(newSelectedOrderStatus)

    const urlParams = new URLSearchParams(window.location.search)

    if (newSelectedOrderStatus.length === 0) urlParams.delete("order_status")
    else urlParams.set("order_status", newSelectedOrderStatus.join(","))

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname

    window.history.pushState({}, "", newUrl)
  }

  function onOrderTimeCheckboxClick(time, isChecked) {
    let newSelectedOrderTime = []

    if (isChecked) {
      newSelectedOrderTime = [...selectedOrderTime, time]
    } else {
      // If the checkbox is unchecked, remove the brand from the selected brands
      newSelectedOrderTime = selectedOrderTime.filter((o) => o !== time)
    }

    setSelectedOrderTime(newSelectedOrderTime)

    const urlParams = new URLSearchParams(window.location.search)

    if (newSelectedOrderTime.length === 0) urlParams.delete("order_time")
    else urlParams.set("order_time", newSelectedOrderTime.join(","))

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname

    window.history.pushState({}, "", newUrl)
  }

  function handleClearOrderStatusFilter() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("order_status")

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname

    window.history.pushState({}, "", newUrl)
    setSelectedOrderStatus([])
  }

  function handleClearOrderTimeFilter() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("order_time")

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname

    window.history.pushState({}, "", newUrl)
    setSelectedOrderTime([])
  }

  const shouldShowClearAllFilterButton = useMemo(() => {
    return selectedOrderStatus.length > 0 || selectedOrderTime.length > 0
  }, [selectedOrderStatus, selectedOrderTime])

  function handleClearAllFilters() {
    setAccordionValue([])
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.delete("order_status")
    urlParams.delete("order_time")

    const newUrl = urlParams.toString()
      ? "?" + urlParams.toString()
      : window.location.pathname

    window.history.pushState({}, "", newUrl)

    setSelectedOrderStatus([])
    setSelectedOrderTime([])
  }

  const fitlerCount = useMemo(() => {
    return selectedOrderStatus.length + selectedOrderTime.length
  }, [selectedOrderStatus, selectedOrderTime])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const orderStatuses = urlParams.get("order_status")
      ? urlParams.get("order_status").split(",")
      : []

    setSelectedOrderStatus(orderStatuses)

    const orderTimes = urlParams.get("order_time")
      ? urlParams.get("order_time").split(",")
      : []
    setSelectedOrderTime(orderTimes)
  }, [])

  return (
    <div
      className={`${
        isOpenSidebar ? "translate-x-0" : "translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen  w-full rounded-md border-2 bg-white transition-transform duration-500 ease-out md:static md:col-span-4  md:h-full md:w-full md:rounded-sm md:border-0 md:bg-inherit  lg:col-span-2`}
    >
      <div className="bg-white">
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
                {selectedOrderStatus.map((status, i) => (
                  <button
                    key={i}
                    className="group inline-block h-min  rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() => onOrderStatusCheckboxClick(status, false)}
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      {status}
                    </span>
                  </button>
                ))}
                {selectedOrderTime.map((time, i) => (
                  <button
                    key={i}
                    className="group inline-block h-min  rounded-sm bg-gray-200 p-1 shadow-sm hover:bg-gray-300"
                    onClick={() => onOrderTimeCheckboxClick(time, false)}
                  >
                    <span className="pl-1 pr-2">x</span>
                    <span className="text-xs group-hover:line-through">
                      {time}
                    </span>
                  </button>
                ))}
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

        {!isLoading ? (
          <Accordion
            value={accordionValue}
            onChange={(value) => setAccordionValue(value)}
            multiple={true}
          >
            <Accordion.Item value={"ORDER STATUS"}>
              <Accordion.Control className="text-xs font-bold text-gray-800">
                ORDER STATUS
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                {selectedOrderStatus.length > 0 && (
                  <button
                    className="mb-3 flex cursor-pointer items-center justify-start gap-x-2"
                    onClick={handleClearOrderStatusFilter}
                  >
                    <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                      x
                    </span>
                    <span className="text-gray-500">Clear All</span>
                  </button>
                )}
                {[
                  "Order Confirmed",
                  "Shipped",
                  "Out for delivery",
                  "Delivered",
                ].map((status, i) => (
                  <Checkbox
                    key={i}
                    size="xs"
                    label={status}
                    className="mb-3"
                    onChange={(e) =>
                      onOrderStatusCheckboxClick(
                        status,
                        e.currentTarget.checked
                      )
                    }
                    checked={selectedOrderStatus.includes(status)}
                    readOnly
                  />
                ))}
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value={"ORDER TIME"}>
              <Accordion.Control className="text-xs font-bold text-gray-800">
                ORDER TIME
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                {selectedOrderTime.length > 0 && (
                  <button
                    className="mb-3 flex cursor-pointer items-center justify-start gap-x-2"
                    onClick={handleClearOrderTimeFilter}
                  >
                    <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                      x
                    </span>
                    <span className="text-gray-500">Clear All</span>
                  </button>
                )}

                <Checkbox
                  size="xs"
                  label="Last 30 days"
                  className="mb-3"
                  onChange={(e) =>
                    onOrderTimeCheckboxClick(
                      "last 30 days",
                      e.currentTarget.checked
                    )
                  }
                  checked={selectedOrderTime.includes("last 30 days")}
                  readOnly
                />
                {years.map((y, i) => (
                  <Checkbox
                    key={i}
                    size="xs"
                    label={y}
                    className="mb-3"
                    onChange={(e) =>
                      onOrderTimeCheckboxClick(y, e.currentTarget.checked)
                    }
                    checked={selectedOrderTime.includes(y)}
                    readOnly
                  />
                ))}
                <Checkbox
                  size="xs"
                  label="Older"
                  className="mb-3"
                  onChange={(e) =>
                    onOrderTimeCheckboxClick("older", e.currentTarget.checked)
                  }
                  checked={selectedOrderTime.includes("older")}
                  readOnly
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : (
          <div className="p-2">
            <Skeleton className="my-2" height={16} />
            <Skeleton className="my-2" width={150} height={16} />
            <Skeleton className="my-2" height={16} />
            <Skeleton className="my-2" width={150} height={16} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSection
