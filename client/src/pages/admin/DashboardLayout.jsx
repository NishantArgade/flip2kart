import { Accordion, Avatar } from "@mantine/core";
import { useState } from "react";
import { BiSolidArchive } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import {
  MdManageAccounts,
  MdOutlineDashboard,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";
import MobileProfileMenuDropdown from "../../components/MobileProfileMenuDropdown";

const DashboardLayout = () => {
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

          <Accordion className="bg-white  shadow-md " multiple={true}>
            <Accordion.Item value={"PROFILE"}>
              <Link to="/admin-dashboard/profile" className="bg-red-500">
                <div>
                  <Accordion.Control
                    icon={
                      <ImProfile className="text-blue-500  text-[0.96rem] mr-1" />
                    }
                    className="text-xs text-gray-800 font-semibold"
                    chevron={
                      <MdOutlineNavigateNext
                        className="text-gray-500 font-extralight "
                        size={26}
                      />
                    }
                    translate="no"
                    styles={{
                      chevron: {
                        transform: "none",
                        width: "1rem",
                      },
                    }}
                  >
                    PROFILE
                  </Accordion.Control>
                </div>
              </Link>
            </Accordion.Item>

            <Accordion.Item value={"DASHBOARD"}>
              <Link to="/admin-dashboard" className="bg-red-200">
                <Accordion.Control
                  icon={
                    <MdOutlineDashboard className="text-blue-500  text-lg mr-1" />
                  }
                  className="text-xs text-gray-800 font-semibold"
                  chevron={
                    <MdOutlineNavigateNext
                      className="text-gray-500 font-extralight "
                      size={26}
                    />
                  }
                  translate="no"
                  styles={{
                    chevron: {
                      transform: "none",
                      width: "1rem",
                    },
                  }}
                >
                  DASHBOARD
                </Accordion.Control>
              </Link>
            </Accordion.Item>

            <Accordion.Item value={"CLIENT FACING"}>
              <Accordion.Control
                icon={<MdManageAccounts className="text-blue-500 text-lg" />}
                className=" text-gray-800 font-bold text-xs"
              >
                CLIENT FACING
              </Accordion.Control>
              <Accordion.Panel className="text-xs cursor-pointer">
                <NavLink
                  to="/admin-dashboard/products"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500  p-3 w-full block"
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/admin-dashboard/users"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="/admin-dashboard/orders"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Transactions
                </NavLink>
                <NavLink
                  to="/admin-dashboard/reviews"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Reviews
                </NavLink>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={"SALES"}>
              <Accordion.Control
                icon={
                  <ImProfile className="text-blue-500 text-[0.96rem] mr-1" />
                }
                className="text-xs text-gray-800 font-bold"
              >
                SALES
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                <NavLink
                  to=""
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
                  to=""
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

            <Accordion.Item value={"MANAGEMENT"}>
              <Accordion.Control
                icon={
                  <ImProfile className="text-blue-500 text-[0.96rem] mr-1" />
                }
                className="text-xs text-gray-800 font-bold"
              >
                MANAGEMENT
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                <NavLink
                  to=""
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
                  to=""
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

            <Accordion.Item value={"LOGOUT"}>
              <Link to="/login">
                <Accordion.Control
                  icon={
                    <RiLogoutCircleRLine className="-rotate-90 text-blue-500 text-lg mr-1" />
                  }
                  className="text-xs text-gray-800 font-semibold"
                  chevron={
                    <MdOutlineNavigateNext
                      className="text-gray-500 font-extralight "
                      size={26}
                    />
                  }
                  translate="no"
                  styles={{
                    chevron: {
                      transform: "none",
                      width: "1rem",
                    },
                  }}
                >
                  LOGOUT
                </Accordion.Control>
              </Link>
            </Accordion.Item>
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

export default DashboardLayout;
