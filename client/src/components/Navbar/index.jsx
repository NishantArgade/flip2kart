import { Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import MobileSidebarDrawer from "../MobileSidebarDrawer/index.jsx";
import ProfileMenuButton from "../ProfileMenuButton/index.jsx";
import ProductSearchInput from "./ProductSearchInput.jsx";

const Navbar = () => {
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState("");

  const removeNavbarPages = ["/add-product", "/edit-product"];
  if (removeNavbarPages.includes(location.pathname)) return null;

  const isLoggedIn = true;
  let isAdmin = true;

  const isAdminUser = isLoggedIn && isAdmin;

  return (
    <>
      {/** SidbarBar Drawer menu for small devices */}
      <MobileSidebarDrawer
        opened={opened}
        close={close}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />

      <div className=" z-[2000] bg-white  shadow-md top-0 left-0 right-0 sticky overflow-visible ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-3 lg:px-12 ">
          {/** Navbar for Mobile */}
          <div className=" md:hidden w-full text-2xl flex justify-between items-center px-2 mb-4">
            <div className="flex items-center gap-x-4">
              <GiHamburgerMenu
                onClick={open}
                size={25}
                className="text-gray-600"
              />
              <Link to="/">
                <img
                  className="w-[6rem] md:w-24"
                  src="/flipkart-logo.png"
                  alt="brand"
                />
              </Link>
            </div>
            <div className="flex items-center gap-x-5 text-gray-500">
              {isLoggedIn ? (
                <Link
                  to={isAdminUser ? "/admin-dashboard/profile" : "/dashboard"}
                >
                  <Avatar src="avatar.png" alt="it's me" size={25} />
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="text-xs hover:text-white px-2 py-[0.1rem] shadow-md rounded-sm font-semibold hover:bg-blue-500 bg-gray-100 text-gray-500"
                >
                  Login
                </Link>
              )}
              <Link to="/cart" className="pr-1">
                <BsCart3 size={21} />
              </Link>
            </div>
          </div>

          {/** Navbar for Large Screens */}
          <div className="flex justify-between items-center  md:gap-x-2 md:px-2 w-full  ">
            <div className="flex md:gap-x-4  w-full">
              <Link to="/">
                <img
                  className="w-16 md:w-24 hidden md:inline-block"
                  src="/flipkart-logo.png"
                  alt="brand"
                />
              </Link>

              <div className="flex items-center justify-start  w-full lg:w-[38rem]">
                <ProductSearchInput setSearchValue={setSearchValue} />
              </div>
            </div>

            <div className="lg:flex lg:justify-between lg:items-center lg:gap-x-8 hidden md:flex md:gap-x-2">
              <ProfileMenuButton isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

              <Link
                to="/cart"
                className="flex justify-center items-center gap-x-1 cursor-pointer"
              >
                <span>
                  <BsCart3 />
                </span>
                <span className="text-sm  md:hidden lg:inline-block">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
