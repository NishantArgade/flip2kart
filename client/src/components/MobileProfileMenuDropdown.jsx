import { Accordion, Avatar, Drawer, Popover, Text } from "@mantine/core";
import React, { useState } from "react";
import { BiSolidArchive } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { IoMdTrash } from "react-icons/io";
import { MdManageAccounts, MdOutlineNavigateNext } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const MobileProfileMenuDropdown = ({ opened, setOpened }) => {
  const isAdmin = true;
  return (
    <Drawer
      position="right"
      size="xs"
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <div>
        <div className="mb-3 rounded-sm bg-white  shadow-md text-start text-gray-800  p-2 flex  justify-start items-center gap-x-2 ">
          <Avatar src="avatar.png" alt="it's me" size={38} />
          <div>
            <p className="text-xs">Hello,</p>
            <p className="text-sm font-semibold">Nishant Argade</p>
          </div>
        </div>

        {isAdmin ? (
          <Accordion className="bg-white  shadow-md " multiple={true}>
            <Accordion.Item value={"PROFILE"}>
              <Link to="/admin-dashboard/profile" className="bg-red-200">
                <Accordion.Control
                  icon={
                    <ImProfile className="text-blue-500  text-[0.96rem] mr-1" />
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
                  PROFILE
                </Accordion.Control>
              </Link>
            </Accordion.Item>

            <Accordion.Item value={"CLIENT FACING"}>
              <Accordion.Control
                icon={<MdManageAccounts className="text-blue-500 text-lg" />}
                className=" text-gray-800 font-bold text-xs"
              >
                CLIENT FACING
              </Accordion.Control>
              <Accordion.Panel className="text-xs cursor-pointer">
                <NavLink
                  to="/admin-dashboard/products"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500  p-3 w-full block"
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/admin-dashboard/users"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="/admin-dashboard/orders"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Transactions
                </NavLink>
                <NavLink
                  to="/admin-dashboard/reviews"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Reviews
                </NavLink>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={"SALES"}>
              <Accordion.Control
                icon={
                  <ImProfile className="text-blue-500 text-[0.96rem] mr-1" />
                }
                className="text-xs text-gray-800 font-bold"
              >
                SALES
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                <NavLink
                  to=""
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
                  to=""
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

            <Accordion.Item value={"MANAGEMENT"}>
              <Accordion.Control
                icon={
                  <ImProfile className="text-blue-500 text-[0.96rem] mr-1" />
                }
                className="text-xs text-gray-800 font-bold"
              >
                MANAGEMENT
              </Accordion.Control>
              <Accordion.Panel className="text-xs">
                <NavLink
                  to=""
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
                  to=""
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
              <Link to="/login">
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
              </Link>
            </Accordion.Item>
          </Accordion>
        ) : (
          <Accordion className="bg-white  shadow-md " multiple={true}>
            <Accordion.Item value={"MY ORDERS"}>
              <Link to="/profile/orders" className="bg-red-200">
                <Accordion.Control
                  icon={
                    <ImProfile className="text-blue-500  text-[0.96rem] mr-1" />
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
              </Link>
            </Accordion.Item>

            <Accordion.Item value={"ACCOUNT SETTINGS"}>
              <Accordion.Control
                icon={<MdManageAccounts className="text-blue-500 text-lg" />}
                className=" text-gray-800 font-bold text-xs"
              >
                ACCOUNT SETTINGS
              </Accordion.Control>
              <Accordion.Panel className="text-xs cursor-pointer">
                <NavLink
                  to="/profile"
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
                  to="/profile/manage-address"
                  end
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F5FAFF] text-blue-500 mt-1 p-3 w-full block"
                      : "hover:bg-[#F5FAFF] hover:text-blue-500 mt-1 p-3 w-full block"
                  }
                >
                  Manage Address
                </NavLink>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={" MY STUFF"}>
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
                  to="/profile/reviews-and-ratings"
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
                  to="/profile/wishlist"
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
              <Link to="/login">
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
              </Link>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    </Drawer>
  );
};

export default MobileProfileMenuDropdown;
