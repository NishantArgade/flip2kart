import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Outlet } from "react-router-dom"
import MenuList from "./MenuList"

const AdminDashboardLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <>
      {/** Menu Drawer For Small Devices */}
      <BsThreeDotsVertical
        className="ml-2 mr-2 mt-2  cursor-pointer text-gray-600 md:hidden"
        onClick={() => setIsOpenSidebar(true)}
        size={22}
      />

      <div className="container mx-auto  mb-5 grid grid-cols-12 gap-x-2 gap-y-2 px-2 py-1">
        {/* Left Menu Sidebar Section */}
        <section className="md:col-span-4 lg:col-span-2">
          <MenuList
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </section>

        {/* Right Section for Outlet (children)*/}
        <section className="col-span-12 h-fit bg-white md:col-span-8 lg:col-span-10">
          <Outlet />
        </section>
      </div>
    </>
  )
}

export default AdminDashboardLayout
