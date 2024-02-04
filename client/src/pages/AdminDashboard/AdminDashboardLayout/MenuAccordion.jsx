import { Accordion, Avatar } from "@mantine/core"
import { BsBoxSeam } from "react-icons/bs"
import { ImProfile } from "react-icons/im"
import { MdManageAccounts, MdOutlineDashboard } from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"
import MultiMenuDashboardAccordionItem from "../../../components/MultiMenuDashboardAccordionItem"
import SingleMenuDashboardAccordionItem from "../../../components/SingleMenuDashboardAccordionItem"

const MenuAccordion = ({ isOpenSidebar, setIsOpenSidebar }) => {
  return (
    <div
      className={`${
        isOpenSidebar
          ? "-translate-x-0  bg-white"
          : "-translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen w-full rounded-md border-2 border-gray-200 transition-all duration-500 ease-in-out  md:static  md:col-span-4 md:h-full   md:w-full md:rounded-sm md:border-0 md:bg-none lg:col-span-2`}
    >
      {/** Header Section */}
      <div className="mb-3 flex items-center  justify-between rounded-sm bg-white  p-2 text-start  text-gray-800 shadow-md  ">
        <div className="flex items-center gap-x-2">
          <Avatar src="avatar.png" alt="it's me" size={38} />
          <div>
            <p className="text-xs">Hello,</p>
            <p className="text-sm font-semibold">Nishant Argade</p>
          </div>
        </div>
        <button
          className="self-start text-gray-500 md:hidden"
          onClick={() => setIsOpenSidebar(false)}
        >
          <RxCrossCircled size={25} />
        </button>
      </div>

      {/** Accordion Menu */}
      <Accordion className="bg-white  shadow-md " multiple={true}>
        <SingleMenuDashboardAccordionItem
          name={"PROFILE"}
          icon={<ImProfile className="mr-1  text-[0.96rem] text-blue-500" />}
          link={"/admin-dashboard/profile"}
        />
        <SingleMenuDashboardAccordionItem
          name={"MY ORDERS"}
          icon={<BsBoxSeam className="mr-1  text-lg text-blue-500" size={20} />}
          link={"/my-orders"}
        />

        <SingleMenuDashboardAccordionItem
          name={"DASHBOARD"}
          icon={<MdOutlineDashboard className="mr-1  text-lg text-blue-500" />}
          link={"/admin-dashboard"}
        />

        <MultiMenuDashboardAccordionItem
          name={"CLIENT FACING"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            { name: "Products", link: "/admin-dashboard/products" },
            { name: "Users", link: "/admin-dashboard/users" },
            { name: "Transactions", link: "/admin-dashboard/transactions" },
            { name: "Reviews", link: "/admin-dashboard/reviews" },
            { name: "Geography", link: "/admin-dashboard/geography" },
          ]}
        />

        <MultiMenuDashboardAccordionItem
          name={"SALES"}
          icon={<ImProfile className="mr-1 text-[0.96rem] text-blue-500" />}
          subMenu={[
            { name: "Overview", link: "/admin-dashboard/sales-overview" },
            { name: "Daily", link: "/admin-dashboard/daily-sales" },
            { name: "Monthly", link: "/admin-dashboard/monthly-sales" },
            { name: "Breakdown", link: "/admin-dashboard/sales-breakdown" },
          ]}
        />

        <MultiMenuDashboardAccordionItem
          name={"MANAGEMENT"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            { name: "Admin", link: "/" },
            { name: "Performance", link: "/" },
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

export default MenuAccordion
