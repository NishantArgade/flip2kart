import { Accordion, Checkbox } from "@mantine/core";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

const FilterSection = ({ setIsOpenSidebar }) => {
  return (
    <div className="bg-white">
      <p className="text-start  text-gray-800 border-b-2 border-gray-200 p-2 flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm">
          <button
            className="md:hidden self-start text-gray-500 "
            onClick={() => setIsOpenSidebar(false)}
          >
            <IoArrowBack size={25} />
          </button>
          <span>Filters</span>
        </div>
        <span className="text-blue-500 text-[0.6rem] font-semibold cursor-pointer ">
          CLEAR ALL
        </span>
      </p>

      <Accordion multiple>
        <Accordion.Item value={"ORDER STATUS"}>
          <Accordion.Control className="text-xs text-gray-800 font-bold">
            ORDER STATUS
          </Accordion.Control>
          <Accordion.Panel className="text-xs">
            <div className="flex justify-start items-center gap-x-2 cursor-pointer ">
              <span className="px-1 text-gray-500 bg-gray-100 rounded-sm">
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
          <Accordion.Control className="text-xs text-gray-800 font-bold">
            ORDER TIME
          </Accordion.Control>
          <Accordion.Panel className="text-xs">
            <div className="flex justify-start items-center gap-x-2 cursor-pointer ">
              <span className="px-1 text-gray-500 bg-gray-100 rounded-sm">
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
  );
};

export default FilterSection;
