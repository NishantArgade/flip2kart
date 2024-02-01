import { Accordion, Checkbox, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { BsFilterCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filterPriceRange, setFilterPriceRange] = useState([0, 500]);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  function getFilterPriceRange() {
    let options = [];
    for (let i = 0; i <= priceRange[1]; i += 100) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  }

  const products = [
    {
      name: "IPhone",
      image: "/book.png",
      description:
        "Lorem Invidunt sit no et ipsum kasd rebum clita. Duo sanctus duo tempor clita aliquyam, eos dolores dolore nonumy no lorem.",
      price: 1000,
      stock: 20,
      deliveryCharges: 0,
      quantity: 10,
    },
    {
      name: "Shirt",
      image: "/shirt.png",
      description:
        "Lorem Invidunt sit no et ipsum kasd rebum clita. Duo sanctus duo tempor clita aliquyam, eos dolores dolore nonumy no lorem.",
      price: 3000,
      stock: 440,
      deliveryCharges: 50,
      quantity: 10,
    },
    {
      name: "Canon Camera",
      image: "/camera.png",
      description:
        "Lorem Invidunt sit no et ipsum kasd rebum clita. Duo sanctus duo tempor clita aliquyam, eos dolores dolore nonumy no lorem.",
      price: 3000,
      stock: 440,
      deliveryCharges: 0,
      quantity: 30,
    },
    {
      name: "Shirt",
      image: "/shirt.png",
      description:
        "Lorem Invidunt sit no et ipsum kasd rebum clita. Duo sanctus duo tempor clita aliquyam, eos dolores dolore nonumy no lorem.",
      price: 3000,
      stock: 440,
      deliveryCharges: 50,
      quantity: 10,
    },
    {
      name: "Canon Camera",
      image: "/camera.png",
      description:
        "Lorem Invidunt sit no et ipsum kasd rebum clita. Duo sanctus duo tempor clita aliquyam, eos dolores dolore nonumy no lorem.",
      price: 3000,
      stock: 440,
      deliveryCharges: 0,
      quantity: 30,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12    gap-x-2 gap-y-2 p-2">
        <BsFilterCircleFill
          className="text-gray-500 cursor-pointer mb-2  md:hidden"
          onClick={() => setIsOpenSidebar(true)}
          size={24}
        />

        {/** Filter Section */}
        <div className="md:col-span-4 lg:col-span-2 ">
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsOpenSidebar(false);
            }}
            disabled={!isOpenSidebar}
          >
            <div
              className={`${
                isOpenSidebar
                  ? "-translate-x-0"
                  : "-translate-x-96 md:-translate-x-0"
              } col-span-12 fixed left-0 top-24 md:static bg-gray-100 md:bg-none border-2 rounded-md md:rounded-sm border-gray-200 md:border-0 z-50 w-2/3 md:w-full  h-full   duration-500 transition-all ease-in-out md:col-span-4 lg:col-span-2`}
            >
              <div className="col-span-2 h-fit bg-white">
                <div className="col-span-2 h-auto bg-white">
                  <p className="text-start  text-gray-800 border-b-2 border-gray-200 p-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>Filters</span>
                      <span className="text-blue-500 text-[0.6rem] font-semibold cursor-pointer ">
                        CLEAR ALL
                      </span>
                    </div>
                    <button
                      className="md:hidden self-start text-gray-500 "
                      onClick={() => setIsOpenSidebar(false)}
                    >
                      <RxCrossCircled size={25} />
                    </button>
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
            </div>
          </OutsideClickHandler>
        </div>
        {/** Products Listing Section */}
        <div className="col-span-12  bg-white md:col-span-8 lg:col-span-10">
          <div className="p-2 my-1  text-sm">
            <span className="font-semibold "> Sort By </span>
            Popularity Price -- Low to High Price -- High to Low
          </div>

          {/* products grid */}
          <div className="px-2 grid grid-cols-2 md:grid-cols-3 gap-x-2 lg:gap-x-4 lg:gap-y-6 gap-y-4 lg:grid-cols-4 ">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
