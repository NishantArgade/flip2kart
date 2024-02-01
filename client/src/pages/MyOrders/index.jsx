import { useState } from "react";
import { BsFilterCircleFill } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";
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

      {/** Main Component*/}
      <div className="grid grid-cols-12 min-h-[30rem] gap-x-2 gap-y-2 p-2 container mx-auto">
        <BsFilterCircleFill
          className="text-gray-500 my-2   cursor-pointer md:hidden"
          onClick={() => setIsOpenSidebar(true)}
          size={22}
        />
        {/* Filter Section */}
        <div className="md:col-span-4 lg:col-span-2 ">
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsOpenSidebar(false);
            }}
            disabled={!isOpenSidebar}
          >
            {/* <div className="md:col-span-4 lg:col-span-2 h-fit bg-white  shadow-md hidden md:block"> */}
            <div
              className={`${
                isOpenSidebar
                  ? "-translate-x-0"
                  : "-translate-x-96 md:-translate-x-0"
              } col-span-12 fixed left-0 top-24 md:static bg-gray-100 md:bg-none border-2 rounded-md md:rounded-sm border-gray-200 md:border-0 z-50 w-2/3 md:w-full  h-full   duration-500 transition-all ease-in-out md:col-span-4 lg:col-span-2`}
            >
              <FilterSection setIsOpenSidebar={setIsOpenSidebar} />
            </div>
          </OutsideClickHandler>
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
