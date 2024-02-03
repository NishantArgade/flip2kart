import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import MenuAccordion from "./MenuAccordion";

const AdminDashboardLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <>
      <BsThreeDotsVertical
        className="text-gray-600 mr-2 mt-2  cursor-pointer md:hidden ml-2"
        onClick={() => setIsOpenSidebar(true)}
        size={22}
      />

      <div className="grid grid-cols-12  gap-x-2 gap-y-2 p-2 container mx-auto">
        {/* Admin Dashboard Left Sidebar Section */}
        <div className="md:col-span-4 lg:col-span-2">
          <MenuAccordion
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </div>

        {/* Right Section for Outlet (children)*/}
        <div className="md:col-span-8 lg:col-span-10 col-span-12  bg-white  shadow-md">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
