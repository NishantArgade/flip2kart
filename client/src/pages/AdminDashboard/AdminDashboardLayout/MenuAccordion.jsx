import { Accordion, Avatar } from "@mantine/core";
import { BsBoxSeam } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { MdManageAccounts, MdOutlineDashboard } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import OutsideClickHandler from "react-outside-click-handler";
import MultiMenuAccordionItem from "./MultiMenuAccordionItem";
import SingleMenuAccordionItem from "./SingleMenuAccordionItem";

const MenuAccordion = ({ isOpenSidebar, setIsOpenSidebar }) => {
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsOpenSidebar(false);
      }}
      disabled={!isOpenSidebar}
    >
      <div
        className={`${
          isOpenSidebar ? "-translate-x-0" : "-translate-x-96 md:-translate-x-0"
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
            className="md:hidden self-start text-gray-500"
            onClick={() => setIsOpenSidebar(false)}
          >
            <RxCrossCircled size={25} />
          </button>
        </div>

        <Accordion className="bg-white  shadow-md " multiple={true}>
          <SingleMenuAccordionItem
            name={"PROFILE"}
            icon={<ImProfile className="text-blue-500  text-[0.96rem] mr-1" />}
            link={"/admin-dashboard/profile"}
          />
          <SingleMenuAccordionItem
            name={"MY ORDERS"}
            icon={
              <BsBoxSeam className="text-blue-500  text-lg mr-1" size={20} />
            }
            link={"/my-orders"}
          />

          <SingleMenuAccordionItem
            name={"DASHBOARD"}
            icon={
              <MdOutlineDashboard className="text-blue-500  text-lg mr-1" />
            }
            link={"/admin-dashboard"}
          />

          <MultiMenuAccordionItem
            name={"CLIENT FACING"}
            icon={<MdManageAccounts className="text-blue-500 text-lg" />}
            subMenu={[
              { name: "Products", link: "/admin-dashboard/products" },
              { name: "Users", link: "/admin-dashboard/users" },
              { name: "Transactions", link: "/admin-dashboard/transactions" },
              { name: "Reviews", link: "/admin-dashboard/reviews" },
            ]}
          />

          <MultiMenuAccordionItem
            name={"SALES"}
            icon={<ImProfile className="text-blue-500 text-[0.96rem] mr-1" />}
            subMenu={[
              { name: "PQR", link: "/" },
              { name: "XYZ", link: "/" },
            ]}
          />

          <MultiMenuAccordionItem
            name={"MANAGEMENT"}
            icon={<MdManageAccounts className="text-blue-500 text-lg" />}
            subMenu={[
              { name: "ABC", link: "/" },
              { name: "MNO", link: "/" },
            ]}
          />

          <SingleMenuAccordionItem
            name={"LOGOUT"}
            icon={
              <RiLogoutCircleRLine className="-rotate-90 text-blue-500 text-lg mr-1" />
            }
            link={"/login"}
          />
        </Accordion>
      </div>
    </OutsideClickHandler>
  );
};

export default MenuAccordion;
