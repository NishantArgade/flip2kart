import {
  Accordion,
  Avatar,
  Checkbox,
  RangeSlider,
  Select,
} from "@mantine/core";
import React, { useState } from "react";
import { BiSolidArchive } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { MdManageAccounts, MdOutlineNavigateNext } from "react-icons/md";
import { RiAccountBoxFill, RiLogoutCircleRLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { Link, NavLink, Outlet } from "react-router-dom";

const MyOrders = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filterPriceRange, setFilterPriceRange] = useState([0, 500]);
  const groceries = [
    {
      value: "BRAND",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      value: "CUSTOMER RATINGS",
      description:
        "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
    },
    {
      value: "DISCOUNT",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
    {
      value: "AVAILABILITY",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
  ];

  function getFilterPriceRange() {
    let options = [];
    for (let i = 0; i <= priceRange[1]; i += 100) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  }

  return (
    <div>
      <div className="grid grid-cols-12  gap-x-2 gap-y-2 p-2">
        {/* Left sidebar Section */}

        <div className="col-span-2 h-auto min-h-[25rem] bg-white">
          <p className="text-start  text-gray-800 border-b-2 border-gray-200 p-2 flex justify-between items-center gap-x-2 ">
            <span>Filters</span>
            <span className="text-blue-500 text-[0.6rem] font-semibold cursor-pointer ">
              CLEAR ALL
            </span>
          </p>

          <Accordion multiple>
            {" "}
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
        {/* Right Section */}
        <div className="col-span-10  bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
