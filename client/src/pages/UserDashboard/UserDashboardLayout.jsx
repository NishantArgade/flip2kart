import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Outlet } from "react-router-dom"
import LeftMenuSection from "./LeftMenuSection"

const UserDashboardLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <div className="container mx-auto grid  min-h-screen grid-cols-12 gap-x-2 gap-y-2 p-2">
      {/** Menu Options Button */}
      <BsThreeDotsVertical
        className="mb-2 cursor-pointer   text-gray-600 md:hidden"
        onClick={() => setIsOpenSidebar(true)}
        size={22}
      />

      {/* Left sidebar Section */}
      <section className="md:col-span-4 lg:col-span-2 ">
        <LeftMenuSection
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
      </section>

      {/* Right Section */}
      <section className="col-span-12 bg-white shadow-md  md:col-span-8  lg:col-span-10">
        <Outlet />
      </section>
    </div>
  )
}

export default UserDashboardLayout
