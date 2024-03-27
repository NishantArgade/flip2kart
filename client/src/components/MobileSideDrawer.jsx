import { Avatar, Drawer } from "@mantine/core"
import { Link } from "react-router-dom"
import {
  adminNavLinks,
  unAuthUserNavLinks,
  userNavLinks,
} from "../utils/navLinkMenuData"

const MobileSideDrawer = ({ opened, close, isLoggedIn, isAdmin }) => {
  const getItemList = () => {
    if (isLoggedIn && isAdmin) return adminNavLinks()
    else if (isLoggedIn && !isAdmin) return userNavLinks()
    else return unAuthUserNavLinks()
  }

  const isAdminUser = isLoggedIn && isAdmin

  const dashboardLink = isAdminUser ? "/admin-dashboard" : "/account"

  return (
    <Drawer opened={opened} size="xs" onClose={close}>
      {isLoggedIn ? (
        <div className="mb-3 flex w-full items-center justify-between rounded-sm  border-b-2 border-gray-300 bg-gray-50 px-2 py-5 shadow-md">
          <div className="flex  items-center gap-3 text-gray-500">
            <Link to={dashboardLink} onClick={close}>
              <Avatar />
            </Link>
            <div className="flex flex-col gap-y-1">
              <Link to={dashboardLink} onClick={close}>
                Nishant Argade
              </Link>
              <Link
                to={dashboardLink}
                className={`${
                  isAdminUser ? "text-orange-500" : "text-green-500"
                } font-base text-xs tracking-wide `}
              >
                {isAdminUser ? "Admin" : "User"}
              </Link>
            </div>
          </div>
          <span>
            <img src="/flipkart-icon.svg" className="h-8 w-8 rounded-full" />
          </span>
        </div>
      ) : (
        <div className="mb-3 flex w-full items-center justify-between rounded-sm border-b-2 border-gray-300  bg-gray-50 px-2 py-5 text-sm text-gray-600 shadow-md">
          <div className="flex flex-col gap-2">
            <p>
              Already An Account?{" "}
              <Link
                to="/login"
                className="font-medium tracking-wide text-blue-500"
              >
                SignIn
              </Link>
            </p>
            <p>
              New Customer?{" "}
              <Link
                to="/register"
                className="font-medium tracking-wide text-blue-500"
              >
                SignUp
              </Link>
            </p>
          </div>
          <Link to="/">
            <img src="/flipkart-icon.svg" className="h-8 w-8 rounded-full" />
          </Link>
        </div>
      )}
      {getItemList().map((menuItem, i) => (
        <Link
          key={i}
          to={menuItem?.link}
          onClick={close}
          className="flex items-center gap-x-3 rounded-sm  border-b-[1.5px] border-gray-300 px-3 py-3 hover:bg-[#F5FAFF]"
        >
          <div>{menuItem?.icon}</div>
          <div>{menuItem?.name}</div>
        </Link>
      ))}
    </Drawer>
  )
}

export default MobileSideDrawer
