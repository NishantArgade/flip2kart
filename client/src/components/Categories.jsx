import { Group, HoverCard, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="bg-white  shadow-md">
      <div className="px-40 ">
        <div className="flex justify-between items-center py-2 cursor-pointer">
          {[1, 2, 3, 4, 5, 6, 7].map((value, index) => (
            <Group key={index} justify="center">
              <HoverCard
                width={120}
                shadow="md"
                position="bottom-start"
                styles={{
                  dropdown: {
                    background: "red",
                    padding: "0rem",
                  },
                }}
              >
                <HoverCard.Target>
                  <Link
                    to="/all-products"
                    className="flex flex-col justify-center items-center "
                  >
                    <div className="h-16 flex flex-col justify-center items-center ">
                      <img className="w-12" src="/shirt.png" alt="" />
                    </div>
                    <p className="text-xs">Mobiles </p>
                  </Link>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <div className="flex flex-col items-start justify-start text-gray-700 text-xs shadow-md">
                    <Link
                      to="/all-products"
                      className="bg-gray-50 w-full p-2 hover:bg-[#F0F5FF] "
                    >
                      Samsung
                    </Link>
                    <Link
                      to="/all-products"
                      className="bg-gray-50 w-full p-2 hover:bg-[#F0F5FF]"
                    >
                      Readmi
                    </Link>
                    <Link
                      to="/all-products"
                      className="bg-gray-50 w-full p-2 hover:bg-[#F0F5FF]"
                    >
                      Apple
                    </Link>
                    <Link
                      to="/all-products"
                      className="bg-gray-50 w-full p-2 hover:bg-[#F0F5FF]"
                    >
                      Vivo
                    </Link>
                    <Link
                      to="/all-products"
                      className="bg-gray-50 w-full p-2 hover:bg-[#F0F5FF]"
                    >
                      Oppo
                    </Link>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
