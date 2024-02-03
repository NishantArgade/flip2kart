import { useState } from "react";
import { BsFilterCircleFill } from "react-icons/bs";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import FilterSection from "./FilterSection";
import MyOrderSearchBar from "./MyOrderSearchBar";
import OrderProductCard from "./OrderProductCard";

const MyOrders = ({ isAdmin }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const myOrders = [
    {
      id: "123abc",
      name: "TV",
      description:
        "Stet accusam accusam takimata lorem clita. Elitr lorem diam et tempor sit lorem ea lorem ipsum, ea et ipsum et.",
      amount: 200,
      deliveredDate: new Date(),
    },
    {
      id: "11abc",
      name: "Shirt",
      description:
        "Stet accusam accusam takimata lorem clita. Elitr lorem diam et tempor sit lorem ea lorem ipsum, ea et ipsum et.",
      amount: 20,
      deliveredDate: new Date(),
    },
    {
      id: "22ABCD",
      name: "Laptop",
      description:
        "Stet accusam accusam takimata lorem clita. Elitr lorem diam et tempor sit lorem ea lorem ipsum, ea et ipsum et.",
      amount: 100,
      deliveredDate: new Date(),
    },
  ];
  return (
    <div>
      {/** Navigation path */}
      <div className="text-gray-500 flex items-center justify-start container mx-auto px-2 gap-x-2 text-xs">
        <Link to="/" className="hover:text-blue-600">
          HomeMy
        </Link>
        <MdOutlineNavigateNext />
        <Link
          to={`${isAdmin ? "/admin-dashboard" : "/dashboard"}`}
          className="hover:text-blue-600"
        >
          AccountMy
        </Link>
        <MdOutlineNavigateNext />
        <NavLink
          to="/my-orders"
          className={({ isActive }) =>
            isActive ? "text-blue-600 " : "hover:text-blue-600"
          }
        >
          Orders
        </NavLink>
      </div>

      <div className="w-full mt-2 flex justify-end gap-2 px-2 items-center">
        <LuSettings2
          className="text-gray-500 cursor-pointer md:hidden"
          onClick={() => setIsOpenSidebar(true)}
          size={22}
        />
        <span>Filters</span>
      </div>
      {/** Main Component*/}
      <div className="grid grid-cols-12 min-h-[30rem] gap-x-2 gap-y-2 p-2 container mx-auto">
        {/* Filter Section */}
        <div className="md:col-span-4 lg:col-span-2">
          <div
            className={`${
              isOpenSidebar
                ? "translate-x-0"
                : "translate-x-full md:-translate-x-0"
            } col-span-12 fixed left-0 top-0 md:static bg-gray-100 md:bg-none border-2 rounded-md md:rounded-sm border-gray-200 md:border-0 z-50 w-full md:w-full  duration-500 transition-all ease-in-out md:col-span-4 lg:col-span-2 md:h-full h-screen`}
          >
            <FilterSection setIsOpenSidebar={setIsOpenSidebar} />
          </div>
        </div>

        {/* Order Listing Section */}
        <div className="md:col-span-8 lg:col-span-10 col-span-12   bg-white  shadow-md">
          <div className="mt-2 mb-4 flex justify-start px-4">
            {/** SearchBar */}
            <MyOrderSearchBar />
          </div>

          <div>
            {myOrders.map((product) => (
              <OrderProductCard key={product?.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
