import {
  Accordion,
  Avatar,
  Checkbox,
  Menu,
  RangeSlider,
  Select,
} from "@mantine/core";
import React, { useState } from "react";
import { BiSolidArchive } from "react-icons/bi";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { IoMdLogIn } from "react-icons/io";
import {
  MdManageAccounts,
  MdOutlineLogout,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { RiAccountBoxFill, RiLogoutCircleRLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { Link, NavLink, Outlet } from "react-router-dom";
import MobileProfileMenuDropdown from "../components/MobileProfileMenuDropdown";

const Profile = () => {
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
  // phone -> -
  // table -> md
  // desktop -> lg
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <MobileProfileMenuDropdown opened={opened} setOpened={setOpened} />

      <div className="grid grid-cols-12  gap-x-2 gap-y-2 p-2 container mx-auto">
        {/* Left sidebar Section */}

        <div className="md:col-span-4 lg:col-span-2 min-h-[25rem] hidden md:block">
          <div className="mb-3 rounded-sm bg-white  shadow-md text-start text-gray-800  p-2 flex  justify-start items-center gap-x-2 ">
            <Avatar src="avatar.png" alt="it's me" size={38} />
            <div>
              <p className="text-xs">Hello,</p>
              <p className="text-sm font-semibold">Nishant Argade</p>
            </div>
          </div>

          <Accordion className="bg-white  shadow-md py-2" multiple={true}>
            <NavLink
              to="/profile/orders"
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "p-2 bg-[#F5FAFF] text-blue-500 text-sm flex justify-between items-start   font-extralight mx-2 my-0    "
                  : "p-2  text-sm flex justify-between items-start  text-gray-800 font-extralight hover:bg-[#F5FAFF] hover:text-blue-500 mx-2"
              }
            >
              <span className="flex items-center justify-center">
                <span>
                  <BiSolidArchive className="text-blue-500 text-lg mr-1" />
                </span>
                <span className="ml-2 text-xs">MY ORDERS</span>
              </span>
              <span>
                {" "}
                <MdOutlineNavigateNext
                  className="text-gray-500 font-extralight"
                  size={24}
                />{" "}
              </span>
            </NavLink>
            <Accordion.Item
              value={"ACCOUNT SETTINGS"}
              className="border-t-[1px] mt-2"
            >
              <Accordion.Control
                icon={<MdManageAccounts className="text-blue-500 text-lg" />}
                className=" text-gray-800 font-bold text-xs"
              >
                ACCOUNT SETTINGS
              </Accordion.Control>
              <Accordion.Panel className="text-xs cursor-pointer">
                <NavLink
                  to="/profile"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500  p-3 w-full block"
                  }
                >
                  Profile Information
                </NavLink>
                <NavLink
                  to="/profile/manage-address"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Manages Address
                </NavLink>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value={"MY STUFF"}>
              <Accordion.Control
                icon={
                  <ImProfile className="text-blue-500 text-[0.96rem] mr-1" />
                }
                className="text-xs text-gray-800 font-bold"
              >
                MY STUFF
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                <NavLink
                  to="/profile/reviews-and-ratings"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 p-3 w-full block"
                  }
                >
                  My Reviews & Ratings
                </NavLink>
                <NavLink
                  to="/profile/wishlist"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  My Wishlist
                </NavLink>
              </Accordion.Panel>
            </Accordion.Item>

            <Link
              to="/"
              className="p-2 my-2 hover:text-blue-500  flex justify-start items-start gap-x-2 mx-2 text-gray-800 font-extralight hover:bg-[#F5FAFF]"
            >
              <span className="flex justify-center items-center gap-x-2">
                <RiLogoutCircleRLine className="-rotate-90 text-blue-500 text-lg mr-1" />
                <span className="text-xs">LOGOUT</span>
              </span>
            </Link>
          </Accordion>
        </div>

        {/* Right Section */}
        <div className="md:col-span-8 lg:col-span-10 col-span-12  bg-white  shadow-md">
          <div className="flex justify-end mr-1 md:hidden">
            <BsThreeDotsVertical
              size={22}
              className="text-gray-600 mt-2 cursor-pointer md:hidden"
              onClick={() => setOpened((state) => !state)}
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
