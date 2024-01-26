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
import { IoSearchOutline } from "react-icons/io5";
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
      <div className="text-gray-500 flex items-center justify-start container mx-auto px-2 gap-x-2 text-xs">
        <Link to="/" className="hover:text-blue-600">
          HomeMy
        </Link>
        <MdOutlineNavigateNext />
        <Link to="/profile" className="hover:text-blue-600">
          AccountMy
        </Link>
        <MdOutlineNavigateNext />
        <Link to="" className="hover:text-blue-600">
          Orders
        </Link>
      </div>
      <div className="grid grid-cols-12 min-h-[30rem] gap-x-2 gap-y-2 p-2 container mx-auto">
        {/* Left sidebar Section */}
        <div className="col-span-2  h-fit bg-white  shadow-md">
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
        <div className="col-span-10  bg-white  shadow-md">
          <div className="mt-2 mb-4 flex justify-start px-4">
            <div className="w-[45rem] hover:shadow-md flex bg-[#F0F5FF]  rounded-sm items-center  ">
              <input
                className="outline-none bg-[#F0F5FF] w-full h-full px-2"
                placeholder="Search your order here"
                type="text"
                name="search"
              />
              <div className="flex w-40  items-center justify-start gap-x-2 bg-blue-600 text-white text-xs px-4 py-2">
                <IoSearchOutline size={20} />
                <p>Search Order</p>
              </div>
            </div>
          </div>
          <div>
            {[1, 2].map((i) => (
              <Link
                to={`/order-detail/${i}`}
                key={i}
                className="hover:shadow-md flex justify-between items-start px-4 gap-x-16  py-5 border-b-[1.5px]"
              >
                <div className="flex justify-start items-start gap-x-3 ">
                  <div className="px-3 pt-1 w-20 cursor-pointer">
                    <img src="/shirt.png" alt="" />
                  </div>

                  <div className="text-sm w-full">
                    <p className="cursor-pointer text-gray-800">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <p className="cursor-pointer text-xs text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="text-sm  text-center">₹2,000</div>
                <div>
                  <div className="flex justify-  items-center gap-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-600"> </div>
                    <p className="text-sm"> Delivered on Dec 08, 2023</p>
                  </div>
                  <p className="text-xs text-gray-700">
                    Lorem ipsum dolor ctetur adipisicin ctetur adipisicinctetur
                    adipisicincteturg elit. Atque, dicta.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
