import { Menu } from "@mantine/core"
import { MdOutlineLogout } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "../../utils/toast"
import { logout } from "../../api/userApi"
import { persistor } from "../../store" // import persistor from your store
import { useDispatch } from "react-redux"
import { resetUserData } from "../../slices/userSlice"
import { queryClient } from "../../main"

export default function AdminProfileDropdownBtn({
  navLinks,
  TargetButton,
  isLoggedIn,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const response = await logout()

      queryClient.invalidateQueries("checkAuth")
      dispatch(resetUserData())
      persistor.purge()
      navigate("/")

      toast.success(response.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Menu
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
      shadow="md"
      width={200}
      withArrow
      arrowSize={10}
      // classNames={"z-[3000]"}
      zIndex={3000}
    >
      <Menu.Target>{TargetButton}</Menu.Target>

      <Menu.Dropdown>
        {!isLoggedIn && (
          <Menu.Item className="hover:bg-gray-50">
            <p className="flex items-center justify-between border-b-2 pb-2">
              <span>New Customer?</span>
              <Link
                to="/register"
                className="text-blue-500  hover:underline hover:underline-offset-4"
              >
                Signup
              </Link>
            </p>
          </Menu.Item>
        )}

        {navLinks?.map((item) => (
          <Link key={item.link} to={item?.link}>
            <Menu.Item className="hover:bg-gray-50" leftSection={item?.icon}>
              {item?.name}
            </Menu.Item>
          </Link>
        ))}

        {isLoggedIn && (
          <Menu.Item
            className="hover:bg-gray-50"
            leftSection={<MdOutlineLogout size={24} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
