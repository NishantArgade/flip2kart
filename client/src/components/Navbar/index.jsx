import { Avatar } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AvatarButton from "../AvatarButton/index.jsx"
import MobileSideDrawer from "../MobileSideDrawer.jsx"
import SearchInput from "./SearchInput.jsx"
import { useSelector } from "react-redux"

const Navbar = ({ authData }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)
  const [searchValue, setSearchValue] = useState("")

  const { isLoggedIn, user } = authData

  const removeNavbarPages = ["/add-product", "/edit-product"]
  if (removeNavbarPages.includes(location.pathname)) return null

  let isAdmin = user?.role === "admin"

  const isAdminUser = isLoggedIn && isAdmin

  return (
    <>
      {/** SidbarBar Drawer menu for small devices */}
      <MobileSideDrawer
        opened={opened}
        close={close}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />

      <div className="sticky left-0  right-0 top-0 z-20 overflow-visible bg-white shadow-md ">
        <div className="container mx-auto flex flex-col items-center justify-between py-3 md:flex-row lg:px-12 ">
          {/** Navbar for Mobile */}
          <div className=" mb-4 flex w-full items-center justify-between px-2 text-2xl md:hidden">
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
                  to={isAdminUser ? "/admin-dashboard/profile" : "/account"}
                >
                  <Avatar src="avatar.png" alt="it's me" size={25} />
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="rounded-sm bg-gray-100 px-2 py-[0.1rem] text-xs font-semibold text-gray-500 shadow-md hover:bg-blue-500 hover:text-white"
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
          <div className="flex w-full items-center  justify-between md:gap-x-2 md:px-2  ">
            <div className="flex w-full  md:gap-x-4">
              <Link to="/">
                <img
                  className="hidden w-16 md:inline-block md:w-24"
                  src="/flipkart-logo.png"
                  alt="brand"
                />
              </Link>

              <div className="flex w-full items-center  justify-start px-2 lg:w-[38rem]">
                <SearchInput
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>
            </div>

            <div className="hidden md:flex md:gap-x-2 lg:flex lg:items-center lg:justify-between lg:gap-x-8">
              <AvatarButton
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                user={user}
              />

              <Link
                to="/cart"
                className="flex cursor-pointer items-center justify-center gap-x-1"
              >
                <span>
                  <BsCart3 />
                </span>
                <p className="text-sm  md:hidden lg:inline-block">Cart</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
