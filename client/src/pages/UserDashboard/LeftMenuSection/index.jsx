import { Accordion, Avatar } from "@mantine/core"
import React from "react"
import { BiSolidArchive } from "react-icons/bi"
import { ImProfile } from "react-icons/im"
import { MdManageAccounts, MdOutlineNavigateNext } from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"
import { Link, NavLink } from "react-router-dom"
import MultiMenuDashboardAccordionItem from "../../../components/MultiMenuDashboardAccordionItem"
import SingleMenuDashboardAccordionItem from "../../../components/SingleMenuDashboardAccordionItem"

const LeftMenuSection = ({ isOpenSidebar, setIsOpenSidebar }) => {
  return (
    <div
      className={`${
        isOpenSidebar
          ? "-translate-x-0 bg-white"
          : "-translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen w-full rounded-md border-2 border-gray-200 transition-all duration-500 ease-in-out md:static md:col-span-4 md:h-full   md:w-full md:rounded-sm md:border-0 md:bg-none lg:col-span-2`}
    >
      {/* Sidebar Header */}
      <div className="mb-3 flex items-center  justify-between rounded-sm bg-white  p-2 text-start  text-gray-800 shadow-md  ">
        <div className="flex items-center gap-x-2">
          <Avatar src="avatar.png" alt="it's me" size={38} />
          <div>
            <p className="text-xs">Hello,</p>
            <p className="text-sm font-semibold">Nishant Argade</p>
          </div>
        </div>
        <button
          className="self-start text-gray-500 md:hidden "
          onClick={() => setIsOpenSidebar(false)}
        >
          <RxCrossCircled size={25} />
        </button>
      </div>

      <Accordion className="bg-white  shadow-md" multiple={true}>
        <SingleMenuDashboardAccordionItem
          name={"MY ORDERS"}
          icon={<BiSolidArchive className="mr-1 text-lg text-blue-500" />}
          link={"/my-orders"}
        />

        <MultiMenuDashboardAccordionItem
          name={"ACCOUNT SETTINGS"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            { name: "Profile Information", link: "/dashboard" },
            { name: "Manages Address", link: "/dashboard/manage-address" },
          ]}
        />

        <MultiMenuDashboardAccordionItem
          name={"MY STUFF"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            {
              name: "My Reviews & Ratings",
              link: "/dashboard/reviews-and-ratings",
            },
            { name: "My Wishlist", link: "/dashboard/wishlist" },
          ]}
        />

        <SingleMenuDashboardAccordionItem
          name={"LOGOUT"}
          icon={
            <RiLogoutCircleRLine className="mr-1 -rotate-90 text-lg text-blue-500" />
          }
          link={"/login"}
        />
      </Accordion>
    </div>
  )
}

export default LeftMenuSection
