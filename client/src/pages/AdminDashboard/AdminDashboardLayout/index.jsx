import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Outlet } from "react-router-dom"
import MenuAccordion from "./MenuAccordion"

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

      <div className="container mx-auto  grid grid-cols-12 gap-x-2 gap-y-2 p-2">
        {/* Left Menu Sidebar Section */}
        <section className="md:col-span-4 lg:col-span-2">
          <MenuAccordion
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </section>

        {/* Right Section for Outlet (children)*/}
        <section
          id={"AdminDashboardLayoutRightSection"}
          className="col-span-12 h-fit bg-white md:col-span-8 lg:col-span-10"
        >
          <Outlet />
        </section>
      </div>
    </>
  )
}

export default AdminDashboardLayout
