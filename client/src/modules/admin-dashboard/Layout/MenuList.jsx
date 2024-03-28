import { Accordion, Avatar } from "@mantine/core"
import { ImProfile } from "react-icons/im"
import {
  MdManageAccounts,
  MdOutlineDashboard,
  MdOutlineNavigateNext,
} from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"
import MultiAccordionMenu from "../../../components/MultiAccordionMenu"
import SingleAccordionMenu from "../../../components/SingleAccordionMenu"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../api/userApi"
import { queryClient } from "../../../main"
import { resetUserData } from "../../../slices/userSlice"
import { persistor } from "../../../store"
import { useNavigate } from "react-router-dom"
import { toast } from "../../../utils/toast"
import { getFullUserName } from "../../../utils/helper"

const MenuList = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const user = useSelector((state) => state.user.data)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await logout()

      queryClient.invalidateQueries("checkAuth")
      dispatch(resetUserData())
      persistor.purge()
      navigate("/")

      toast.success(response.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div
      className={`${
        isOpenSidebar ? "-translate-x-0" : "-translate-x-full md:-translate-x-0"
      } fixed left-0 top-0 z-50 col-span-12 h-screen w-full rounded-md border-2 border-gray-200 bg-white transition-transform duration-500 ease-out md:static  md:col-span-4  md:h-full md:w-full   md:rounded-sm md:border-0 md:bg-inherit  lg:col-span-2`}
    >
      {/** Header Section */}
      <div className="mb-3 flex items-center  justify-between rounded-sm bg-white  p-2 text-start  text-gray-800 shadow-md  ">
        <div className="flex items-center gap-x-2">
          <Avatar src="/avatar-placeholder.png" alt="it's me" size={38} />
          <div>
            <p className="text-xs">Hello,</p>
            <p className="text-sm font-semibold">{getFullUserName(user)}</p>
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
        <SingleAccordionMenu
          name={"DASHBOARD"}
          icon={<MdOutlineDashboard className="mr-1  text-lg text-blue-500" />}
          link={"/admin-dashboard"}
        />

        <MultiAccordionMenu
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

        <MultiAccordionMenu
          name={"SALES"}
          icon={<ImProfile className="mr-1 text-[0.96rem] text-blue-500" />}
          subMenu={[
            { name: "Overview", link: "/admin-dashboard/sales-overview" },
            { name: "Daily", link: "/admin-dashboard/daily-sales" },
            { name: "Monthly", link: "/admin-dashboard/monthly-sales" },
            { name: "Breakdown", link: "/admin-dashboard/sales-breakdown" },
          ]}
        />

        <MultiAccordionMenu
          name={"MANAGEMENT"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            { name: "Admins", link: "/admin-dashboard/admins" },
            {
              name: "Performance",
              link: "/admin-dashboard/affiliate-performance",
            },
            {
              name: "Categories",
              link: "/admin-dashboard/categories",
            },
            {
              name: "Offers",
              link: "/admin-dashboard/offers",
            },
            {
              name: "Offices",
              link: "/admin-dashboard/offices",
            },
          ]}
        />

        <Accordion.Item value={"LOGOUT"}>
          <Accordion.Control
            icon={
              <RiLogoutCircleRLine className="mr-1 -rotate-90 text-lg text-blue-500" />
            }
            className="text-xs font-semibold text-gray-800"
            chevron={
              <MdOutlineNavigateNext
                className="font-extralight text-gray-500 "
                size={26}
              />
            }
            translate="no"
            styles={{
              chevron: {
                transform: "none",
                width: "1rem",
              },
            }}
            onClick={handleLogout}
          >
            LOGOUT
          </Accordion.Control>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default MenuList
