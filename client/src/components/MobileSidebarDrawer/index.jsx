/* eslint-disable no-dupe-else-if */
import { Avatar, Drawer } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  getAdminNavLinkMenuItems,
  getUnAuthUserNavLinkMenuItems,
  getUserNavLinkMenuItems,
} from "../../Utils/navLinkMenuData";

const MobileSidebarDrawer = ({ opened, close, isLoggedIn, isAdmin }) => {
  const getItemList = () => {
    if (isLoggedIn && isAdmin) return getAdminNavLinkMenuItems();
    else if (isLoggedIn && !isAdmin) return getUserNavLinkMenuItems();
    else return getUnAuthUserNavLinkMenuItems();
  };

  const isAdminUser = isLoggedIn && isAdmin;

  const dashboardLink = isAdminUser ? "/admin-dashboard" : "/dashboard";

  return (
    <Drawer opened={opened} size="xs" onClose={close}>
      {isLoggedIn ? (
        <div className="flex justify-between items-center w-full px-2 py-5  border-b-2 border-gray-300 shadow-md mb-3 bg-gray-50 rounded-sm">
          <div className="flex text-gray-500 items-center gap-3">
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
                } text-xs font-base tracking-wide `}
              >
                {isAdminUser ? "Admin" : "User"}
              </Link>
            </div>
          </div>
          <span>
            <img src="/flipkart-icon.svg" className="w-8 h-8 rounded-full" />
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm text-gray-600 w-full px-2 py-5  border-b-2 border-gray-300 shadow-md mb-3 bg-gray-50 rounded-sm">
          <div className="flex flex-col gap-2">
            <p>
              Already An Account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-medium tracking-wide"
              >
                SignIn
              </Link>
            </p>
            <p>
              New Customer?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-medium tracking-wide"
              >
                SignUp
              </Link>
            </p>
          </div>
          <Link to="/">
            <img src="/flipkart-icon.svg" className="w-8 h-8 rounded-full" />
          </Link>
        </div>
      )}
      {getItemList().map((menuItem, i) => (
        <Link
          key={i}
          to={menuItem?.link}
          onClick={close}
          className="hover:bg-[#F5FAFF] flex items-center gap-x-3  px-3 py-3 border-b-[1.5px] border-gray-300 rounded-sm"
        >
          <div>{menuItem?.icon}</div>
          <div>{menuItem?.name}</div>
        </Link>
      ))}
    </Drawer>
  );
};

export default MobileSidebarDrawer;
