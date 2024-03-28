import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Outlet } from "react-router-dom"
import MenuList from "./MenuList"

const Layout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <>
      {/** Menu Options Button */}
      <BsThreeDotsVertical
        className="my-1 ml-1 cursor-pointer  text-gray-600 md:hidden"
        onClick={() => setIsOpenSidebar(true)}
        size={22}
      />

      <div
        className="container mx-auto mb-5 grid  grid-cols-12 content-start
      gap-x-2 gap-y-2 px-2  py-1"
      >
        {/* Left sidebar Section */}
        <section className="md:col-span-4 lg:col-span-2 ">
          <MenuList
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </section>

        {/* Right Section */}
        <section
          id="DashboardLayoutRightSection"
          className="col-span-12 min-h-[30rem] bg-white  shadow-md md:col-span-8  lg:col-span-10"
        >
          <Outlet />
        </section>
      </div>
    </>
  )
}

export default Layout
