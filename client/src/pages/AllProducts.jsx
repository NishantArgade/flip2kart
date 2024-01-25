import { Accordion, Checkbox, RangeSlider, Select } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
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
        <div className="col-span-2 h-96 bg-white">
          <div className="col-span-2 h-auto bg-white">
            <p className="text-start  text-gray-800 border-b-2 border-gray-200 p-2 flex justify-between items-center gap-x-2 ">
              <span>Filters</span>
              <span className="text-blue-500 text-[0.6rem] font-semibold cursor-pointer ">
                CLEAR ALL
              </span>
            </p>
            <div className="p-2 mt-2 pb-4 border-b-2 border-gray-100">
              <RangeSlider
                size={"sm"}
                min={priceRange[0]}
                max={priceRange[1]}
                step={100}
                value={[filterPriceRange[0], filterPriceRange[1]]}
                onChange={(value) => setFilterPriceRange(value)}
              />
              <div className="flex justify-between items-center mt-2">
                <select
                  value={filterPriceRange[0]}
                  className="w-[5rem] rounded-sm outline-blue-500 p-1 bg-white border-2 text-xs cursor-pointer"
                  onChange={(e) => {
                    setFilterPriceRange([
                      Number(e.target.value),
                      filterPriceRange[1],
                    ]);
                  }}
                >
                  {getFilterPriceRange()}
                </select>
                <span className="text-gray-400 px-1 text-xs">to</span>
                <select
                  value={filterPriceRange[1]}
                  className="w-[5rem] rounded-sm outline-blue-500 p-1  bg-white border-2 text-xs cursor-pointer"
                  onChange={(e) => {
                    setFilterPriceRange([
                      filterPriceRange[0],
                      Number(e.target.value),
                    ]);
                  }}
                >
                  {getFilterPriceRange()}
                </select>
              </div>
            </div>

            <Accordion multiple={true}>
              {" "}
              <Accordion.Item value={"BRAND"}>
                <Accordion.Control className="text-xs text-gray-800 font-bold">
                  BRAND
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  <div className="flex justify-start items-center gap-x-2 cursor-pointer ">
                    <span className="px-1 text-gray-500 bg-gray-100 rounded-sm">
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
                <Accordion.Control className="text-xs text-gray-800 font-bold">
                  CUSTOMER RATINGS
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  <div className="flex justify-start items-center gap-x-2 cursor-pointer ">
                    <span className="px-1 text-gray-500 bg-gray-100 rounded-sm">
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
                <Accordion.Control className="text-xs text-gray-800 font-bold">
                  DISCOUNT
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  <div className="flex justify-start items-center gap-x-2 cursor-pointer ">
                    <span className="px-1 text-gray-500 bg-gray-100 rounded-sm">
                      x
                    </span>
                    <span className="text-gray-500">Clear All</span>
                  </div>
                  <Checkbox size="xs" label="40% or more" className="mt-3" />
                  <Checkbox size="xs" label="30% or more" className="mt-3" />
                  <Checkbox size="xs" label="20% or more" className="mt-3" />
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
                <Accordion.Control className="text-xs text-gray-800 font-bold">
                  AVAILABILITY
                </Accordion.Control>
                <Accordion.Panel className="text-xs">
                  <div className="flex justify-start items-center gap-x-2 cursor-pointer ">
                    <span className="px-1 text-gray-500 bg-gray-100 rounded-sm">
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
        <div className="col-span-10  bg-white">
          <div className="p-2 my-1  text-sm">
            <span className="font-semibold "> Sort By </span>
            Popularity Price -- Low to High Price -- High to Low
          </div>
          {/* products grid */}
          <div className="grid grid-cols-4 gap-y-5  grid-rows-3  px-2">
            {/* Product */}

            <Link
              to="/product-detail/1"
              className="mx-2 flex flex-col items-start justify-start px-2 cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm py-2"
            >
              <div className="h-80 flex flex-col justify-center items-center overflow-hidden">
                <img
                  src="book.png"
                  className="w-full h-auto  hover:scale-105"
                  alt=""
                />
              </div>
              <div className="mt-2 flex flex-col justify-between gap-y-1">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-500">
                  description Lorem ipsum dolo.
                </p>
                <p className="text-sm font-bold">$200</p>
                <p className="text-xs font-semibold">free delivery</p>
                <p className="text-pink-600 text-xs font-semibold">
                  only few left
                </p>
              </div>
            </Link>
            <Link
              to="/product-detail/2"
              className="mx-2 flex flex-col items-start justify-start px-2 cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm py-2"
            >
              <div className="h-80 flex flex-col justify-center items-center overflow-hidden">
                <img src="mobiles.png" className="w-full h-auto  hover:scale-105" alt="" />
              </div>
              <div className="mt-2 flex flex-col justify-between gap-y-1">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-500">
                  description Lorem ipsum dolo.
                </p>
                <p className="text-sm font-bold">$200</p>
                <p className="text-xs font-semibold">free delivery</p>
                <p className="text-pink-600 text-xs font-semibold">
                  only few left
                </p>
              </div>
            </Link>
            <div className="mx-2 flex flex-col items-start justify-start px-2 cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm py-2">
              <div className="h-80 flex flex-col justify-center items-center overflow-hidden">
                <img
                  src="shirt.png"
                  className="w-full h-auto  hover:scale-105"
                  alt=""
                />
              </div>
              <div className="mt-2 flex flex-col justify-between gap-y-1">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-500">
                  description Lorem ipsum dolo.
                </p>
                <p className="text-sm font-bold">$200</p>
                <p className="text-xs font-semibold">free delivery</p>
                <p className="text-pink-600 text-xs font-semibold">
                  only few left
                </p>
              </div>
            </div>
            <div className="mx-2 flex flex-col items-start justify-start px-2 cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm py-2">
              <div className="h-80 flex flex-col justify-center items-center overflow-hidden">
                <img
                  src="camera.png"
                  className="w-full h-auto  hover:scale-105"
                  alt=""
                />
              </div>
              <div className="mt-2 flex flex-col justify-between gap-y-1">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-500">
                  description Lorem ipsum dolo.
                </p>
                <p className="text-sm font-bold">$200</p>
                <p className="text-xs font-semibold">free delivery</p>
                <p className="text-pink-600 text-xs font-semibold">
                  only few left
                </p>
              </div>
            </div>
            <div className="mx-2 flex flex-col items-start justify-start px-2 cursor-pointer hover:shadow-lg border-2 border-gray-100 rounded-sm py-2">
              <div className="h-80 flex flex-col justify-center items-center overflow-hidden">
                <img
                  src="camera.png"
                  className="w-full h-auto  hover:scale-105"
                  alt=""
                />
              </div>
              <div className="mt-2 flex flex-col justify-between gap-y-1">
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-500">
                  description Lorem ipsum dolo.
                </p>
                <p className="text-sm font-bold">$200</p>
                <p className="text-xs font-semibold">free delivery</p>
                <p className="text-pink-600 text-xs font-semibold">
                  only few left
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
