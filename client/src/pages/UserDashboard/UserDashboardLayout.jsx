import { Accordion, Avatar } from "@mantine/core";
import { useState } from "react";
import { BiSolidArchive } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { MdManageAccounts, MdOutlineNavigateNext } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-12  gap-x-2 gap-y-2 p-2 container mx-auto">
        <BsThreeDotsVertical
          className="text-gray-600 mb-2   cursor-pointer md:hidden"
          onClick={() => setIsOpenSidebar(true)}
          size={22}
        />
        {/* Left sidebar Section */}
        <div className="md:col-span-4 lg:col-span-2 ">
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsOpenSidebar(false);
            }}
            disabled={!isOpenSidebar}
          >
            <div
              className={`${
                isOpenSidebar
                  ? "-translate-x-0"
                  : "-translate-x-96 md:-translate-x-0"
              } col-span-12 fixed left-0 top-24 md:static bg-gray-100 md:bg-none border-2 rounded-md md:rounded-sm border-gray-200 md:border-0 z-50 w-2/3 md:w-full  h-full   duration-500 transition-all ease-in-out md:col-span-4 lg:col-span-2`}
            >
              <div className="mb-3 rounded-sm bg-white  shadow-md text-start text-gray-800  p-2 flex  justify-between items-center  ">
                <div className="flex items-center gap-x-2">
                  <Avatar src="avatar.png" alt="it's me" size={38} />
                  <div>
                    <p className="text-xs">Hello,</p>
                    <p className="text-sm font-semibold">Nishant Argade</p>
                  </div>
                </div>
                <button
                  className="md:hidden self-start text-gray-500 "
                  onClick={() => setIsOpenSidebar(false)}
                >
                  <RxCrossCircled size={25} />
                </button>
              </div>

              <Accordion className="bg-white  shadow-md" multiple={true}>
                <Accordion.Item value={"MY ORDERS"}>
                  <Link to="/my-orders" className="bg-red-500">
                    <div>
                      <Accordion.Control
                        icon={
                          <BiSolidArchive className="text-blue-500 text-lg mr-1" />
                        }
                        className="text-xs text-gray-800 font-semibold"
                        chevron={
                          <MdOutlineNavigateNext
                            className="text-gray-500 font-extralight "
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
                      >
                        MY ORDERS
                      </Accordion.Control>
                    </div>
                  </Link>
                </Accordion.Item>

                <Accordion.Item value={"ACCOUNT SETTINGS"}>
                  <Accordion.Control
                    icon={
                      <MdManageAccounts className="text-blue-500 text-lg" />
                    }
                    className=" text-gray-800 font-bold text-xs"
                  >
                    ACCOUNT SETTINGS
                  </Accordion.Control>
                  <Accordion.Panel className="text-xs cursor-pointer">
                    <NavLink
                      to="/dashboard"
                      end
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                          : "hover:bg-[#F5FAFF] hover:text-blue-500  p-3 w-full block"
                      }
                    >
                      Profile Information
                    </NavLink>
                    <NavLink
                      to="/dashboard/manage-address"
                      end
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                          : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                      }
                    >
                      Manages Address
                    </NavLink>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value={"MY STUFF"}>
                  <Accordion.Control
                    icon={
                      <ImProfile className="text-blue-500 text-[0.96rem] mr-1" />
                    }
                    className="text-xs text-gray-800 font-bold"
                  >
                    MY STUFF
                  </Accordion.Control>
                  <Accordion.Panel className="text-xs">
                    <NavLink
                      to="/dashboard/reviews-and-ratings"
                      end
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                          : "hover:bg-[#F5FAFF] hover:text-blue-500 p-3 w-full block"
                      }
                    >
                      My Reviews & Ratings
                    </NavLink>
                    <NavLink
                      to="/dashboard/wishlist"
                      end
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                          : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                      }
                    >
                      My Wishlist
                    </NavLink>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value={"LOGOUT"}>
                  <Link to="/login" className="bg-red-500">
                    <div>
                      <Accordion.Control
                        icon={
                          <RiLogoutCircleRLine className="-rotate-90 text-blue-500 text-lg mr-1" />
                        }
                        className="text-xs text-gray-800 font-semibold"
                        chevron={
                          <MdOutlineNavigateNext
                            className="text-gray-500 font-extralight "
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
                      >
                        LOGOUT
                      </Accordion.Control>
                    </div>
                  </Link>
                </Accordion.Item>
              </Accordion>
            </div>
          </OutsideClickHandler>
        </div>

        {/* Right Section */}
        <div className="md:col-span-8 lg:col-span-10 col-span-12  bg-white  shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
