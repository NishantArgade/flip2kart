import { Accordion, Avatar } from "@mantine/core"
import { BiSolidArchive } from "react-icons/bi"
import { MdManageAccounts, MdOutlineNavigateNext } from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"
import MultiAccordionMenu from "../../components/MultiAccordionMenu"
import SingleAccordionMenu from "../../components/SingleAccordionMenu"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../api/userApi"
import { queryClient } from "../../main"
import { resetUserData } from "../../slices/userSlice"
import { persistor } from "../../store"
import { useNavigate } from "react-router-dom"
import { toast } from "../../utils/toast"

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
      } fixed left-0 top-0 z-50 col-span-12 h-screen  w-full rounded-md border-2 border-gray-200 bg-white transition-transform duration-500 ease-out md:static md:col-span-4 md:h-full md:w-full   md:rounded-sm md:border-0 md:bg-inherit lg:col-span-2`}
    >
      {/* Sidebar Header */}
      <div className="mb-3 flex items-center  justify-between rounded-sm bg-white  p-2 text-start  text-gray-800 shadow-md  ">
        <div className="flex items-center gap-x-2">
          <Avatar src="/avatar-placeholder.png" alt="it's me" size={38} />
          <div>
            <p className="text-xs">Hello,</p>
            <p className="text-sm font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
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
        <SingleAccordionMenu
          name={"MY ORDERS"}
          icon={<BiSolidArchive className="mr-1 text-lg text-blue-500" />}
          link={"/my-orders"}
        />

        <MultiAccordionMenu
          name={"ACCOUNT SETTINGS"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            { name: "Profile Information", link: "/account" },
            { name: "Manages Address", link: "/account/manage-address" },
          ]}
        />

        <MultiAccordionMenu
          name={"MY STUFF"}
          icon={<MdManageAccounts className="text-lg text-blue-500" />}
          subMenu={[
            {
              name: "My Reviews & Ratings",
              link: "/account/reviews-and-ratings",
            },
            { name: "My Wishlist", link: "/account/wishlist" },
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
