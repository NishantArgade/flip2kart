import { Accordion, Avatar } from "@mantine/core";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import {
  MdManageAccounts,
  MdOutlineDashboard,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, Outlet } from "react-router-dom";
import MenuAccordion from "./MenuAccordion";

const AdminDashboardLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-12  gap-x-2 gap-y-2 p-2 container mx-auto">
        <BsThreeDotsVertical
          className="text-gray-600 mb-2   cursor-pointer md:hidden"
          onClick={() => setIsOpenSidebar(true)}
          size={22}
        />

        {/* Admin Dashboard Left Sidebar Section */}
        <div className="md:col-span-4 lg:col-span-2 ">
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
    </div>
  );
};

export default AdminDashboardLayout;
