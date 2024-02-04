import { Accordion, Checkbox } from "@mantine/core"
import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { RxCrossCircled } from "react-icons/rx"

const FilterSection = ({ isOpenSidebar, setIsOpenSidebar }) => {
  return (
    <div
      className={`${
        isOpenSidebar ? "translate-x-0" : "translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen  w-full rounded-md border-2 bg-white transition-transform duration-500 ease-out md:static md:col-span-4  md:h-full md:w-full md:rounded-sm md:border-0 md:bg-inherit  lg:col-span-2`}
    >
      <div className="bg-white">
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

        <Accordion multiple>
          <Accordion.Item value={"ORDER STATUS"}>
            <Accordion.Control className="text-xs font-bold text-gray-800">
              ORDER STATUS
            </Accordion.Control>
            <Accordion.Panel className="text-xs">
              <div className="flex cursor-pointer items-center justify-start gap-x-2 ">
                <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                  x
                </span>
                <span className="text-gray-500">Clear All</span>
              </div>
              <Checkbox size="xs" label="On the way" className="mt-3" />
              <Checkbox size="xs" label="Delivered" className="mt-3" />
              <Checkbox size="xs" label="Cancelled" className="mt-3" />
              <Checkbox size="xs" label="Returned" className="mt-3" />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value={"ORDER TIME"}>
            <Accordion.Control className="text-xs font-bold text-gray-800">
              ORDER TIME
            </Accordion.Control>
            <Accordion.Panel className="text-xs">
              <div className="flex cursor-pointer items-center justify-start gap-x-2 ">
                <span className="rounded-sm bg-gray-100 px-1 text-gray-500">
                  x
                </span>
                <span className="text-gray-500">Clear All</span>
              </div>
              <Checkbox size="xs" label="Last 30 days" className="mt-3" />
              <Checkbox size="xs" label="2023" className="mt-3" />
              <Checkbox size="xs" label="2022" className="mt-3" />
              <Checkbox size="xs" label="2021" className="mt-3" />
              <Checkbox size="xs" label="Older" className="mt-3" />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}

export default FilterSection
