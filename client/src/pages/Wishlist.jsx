import { Popover, Text } from "@mantine/core";
import React, { Fragment, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";

function handleRemoveProduct() {
  console.log("Product deleted");
}

const DeleteProductButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    // <button onBlur={() => setOpened(false)}>
    <Popover
      opened={opened}
      width={290}
      position="bottom-end"
      withArrow
      shadow="md"
      closeOnClickOutside
      onChange={() => setOpened(false)}
    >
      <Popover.Target>
        <button>
          <IoMdTrash
            onClick={() => setOpened((state) => !state)}
            className="text-gray-400 cursor-pointer"
          />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Are you sure you want to remove this product?</Text>
        <div className="flex items-center justify-center text-xs mt-3 gap-x-2">
          <button className="text-gray-500" onClick={() => setOpened(false)}>
            CANCEL
          </button>
          <button className="text-red-600" onClick={handleRemoveProduct}>
            YES, REMOVE
          </button>
        </div>
      </Popover.Dropdown>
    </Popover>
    // </button>
  );
};

const Wishlist = () => {
  return (
    <>
      <p className="border-b-[1.5px] px-4 py-4">
        My Wishlist <span className="text-gray-500">(2)</span>
      </p>
      <div>
        {[1, 2].map((i) => (
          <span
            key={i}
            className="flex justify-between items-start px-4 w-full  py-5 border-b-[1.5px] cursor-pointer"
          >
            <Link to={"/product-detail/1"}>
              <div className="flex justify-start items-start gap-x-3">
                <div className="px-3 pt-1 w-20 ">
                  <img src="/shirt.png" alt="" />
                </div>

                <div className="text-sm">
                  <p className=" text-gray-800 hover:text-blue-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="text-xs text-gray-700 mt-2">
                    <div className="text-xs text-gray-700 flex items-center justify-start gap-x-2">
                      <span className="bg-green-600 px-1 py-[2px] rounded-sm  text-white">
                        4.5★
                      </span>
                      <span className="font-medium text-gray-500">(460)</span>
                      <div>
                        <img src="/assured.png" className="w-14" alt="" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs mt-4">
                    <span className="text-[1.2rem] mr-2 font-bold">₹1,500</span>
                    <strike className="mr-2 text-gray-700">₹2300</strike>
                    <span className="text-green-600 ">24% off</span>
                  </p>
                </div>
              </div>
            </Link>
            <div>
              <DeleteProductButton />
            </div>
          </span>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
