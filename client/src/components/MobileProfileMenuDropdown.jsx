import { Accordion, Avatar, Drawer, Popover, Text } from "@mantine/core";
import React, { useState } from "react";
import { BiSolidArchive } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { IoMdTrash } from "react-icons/io";
import { MdManageAccounts, MdOutlineNavigateNext } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

const MobileProfileMenuDropdown = ({ opened, setOpened }) => {
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

        <Accordion className="bg-white  shadow-md py-2" multiple={true}>
          <NavLink
            to="/profile/orders"
            end
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "p-2 bg-[#F5FAFF] text-blue-500 text-sm flex justify-between items-start   font-extralight mx-2 my-0    "
                : "p-2  text-sm flex justify-between items-start  text-gray-800  hover:bg-[#F5FAFF] hover:text-blue-500 mx-2"
            }
          >
            <span className="flex items-center justify-center">
              <BiSolidArchive className="text-blue-500 text-lg mr-1" />
              <p className="ml-2 text-xs text-gray-800">MY ORDERS</p>
            </span>

            <span>
              <MdOutlineNavigateNext
                className="text-gray-500 font-extralight"
                size={24}
              />
            </span>
          </NavLink>
          <Accordion.Item
            value={"ACCOUNT SETTINGS"}
            className="border-t-[1px] mt-2"
          >
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
                onClick={() => setOpened(false)}
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
                onClick={() => setOpened(false)}
              >
                Manages Address
              </NavLink>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value={"MY STUFF"}>
            <Accordion.Control
              icon={<ImProfile className="text-blue-500 text-[0.96rem] mr-1" />}
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
                onClick={() => setOpened(false)}
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
                onClick={() => setOpened(false)}
              >
                My Wishlist
              </NavLink>
            </Accordion.Panel>
          </Accordion.Item>

          <Link
            to="/"
            className="p-2 my-2 hover:text-blue-500  flex justify-start items-start gap-x-2 mx-2 text-gray-800 font-extralight hover:bg-[#F5FAFF]"
          >
            <span className="flex justify-center items-center gap-x-2">
              <RiLogoutCircleRLine className="-rotate-90 text-blue-500 text-lg mr-1" />
              <span className="text-xs">LOGOUT</span>
            </span>
          </Link>
        </Accordion>
      </div>
    </Drawer>
  );
};

export default MobileProfileMenuDropdown;
