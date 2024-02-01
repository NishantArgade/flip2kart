import { Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { VscError } from "react-icons/vsc";

function EditTransactionModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState("Processing");

  const onStatusChange = (statusValue) => {
    setStatus(statusValue);
  };

  const getStatus = useMemo(() => {
    if (status === "Processing")
      return (
        <>
          <div className="flex justify-center items-center">
            <FcProcess size={17} />
          </div>
          <p>Processing</p>
        </>
      );
    else if (status === "Delivered")
      return (
        <>
          <div className="flex justify-center items-center">
            <TbTruckDelivery className="text-green-500 " size={17} />
          </div>
          <p>Delivered</p>
        </>
      );
    else
      return (
        <>
          <div className="flex justify-center items-center">
            <VscError className="text-red-500 " size={17} />
          </div>
          <p>Failed</p>
        </>
      );
  }, [status]);

  return (
    <>
      <Modal
        size={800}
        opened={opened}
        onClose={close}
        title="Manage Transaction"
        closeOnClickOutside={false}
        centered
      >
        <div className="gap-6 grid grid-cols-2">
          {/** User Info */}
          <div className="text-xs border-[1.5px] rounded-sm p-2">
            <p className="text-sm mb-2 font-semibold text-gray-800">
              User Info
            </p>
            <p className="mb-1">
              <span>Name: </span>
              <span>Nishant Argade</span>
            </p>
            <p>
              <span>Address: </span>
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
                asperiores.{" "}
              </span>
            </p>
          </div>

          {/** Product Details */}
          <div className="text-xs border-[1.5px] rounded-sm p-2">
            <p className="text-sm mb-2 font-semibold text-gray-800">
              Product Info
            </p>
            <p className="mb-1">
              <span>Product Name: </span>
              <span>Puma Shoes </span>
            </p>
            <p>
              <span>Product ID: </span>
              <span>asdfsdfsdaffsawdsfierj232343ljs</span>
            </p>
          </div>

          {/** Seller Info */}
          <div className="text-xs border-[1.5px] rounded-sm p-2">
            <p className="text-sm mb-2 font-semibold text-gray-800">
              Seller Info
            </p>
            <p className="mb-1">
              <span>Seller Name: </span>
              <span>TechGuru Shop </span>
            </p>
            <p>
              <span>Dispatched Date: </span>
              <span>2023-02-12 02:12:43</span>
            </p>
          </div>

          {/** Amount Info */}
          <div className="text-xs border-[1.5px] rounded-sm p-2">
            <p className="text-sm mb-2 font-semibold text-gray-800">
              Amount Info
            </p>
            <p className="mb-1">
              <span>Purchase Quantity: </span>
              <span>3 </span>
            </p>
            <p>
              <span>Single Item Amount: </span>
              <span>₹200</span>
            </p>
            <p>
              <span>Total: </span>
              <span>₹600</span>
            </p>
            <p>
              <span>No. Of Offer Apply: </span>
              <span>2</span>
            </p>
            <p>
              <span>Discount: </span>
              <span>₹200</span>
            </p>
            <p>
              <span>Shipping Charges: </span>
              <span>₹50</span>
            </p>
            <p>
              <span>Tax: </span>
              <span>₹140</span>
            </p>
            <p>
              <span>Final Amount: </span>
              <span>₹820</span>
            </p>
          </div>

          {/** Payment Info */}
          <div className="text-xs border-[1.5px] rounded-sm p-2">
            <p className="text-sm mb-2 font-semibold text-gray-800">
              Payment Info
            </p>
            <p className="mb-1">
              <span>Payment Mode: </span>
              <span>Phonepay </span>
            </p>
            <p className="mb-1">
              <span>Transaction ID: </span>
              <span>#asfldsf2324jk23hhfhjasfljkafhjjh23</span>
            </p>
            <p>
              <span>Transaction Date: </span>
              <span>2023-02-10 01:10:43</span>
            </p>
          </div>

          {/** Status Info */}
          <div className="text-xs border-[1.5px] rounded-sm p-2">
            <p className="text-sm mb-2 font-semibold text-gray-800">
              Status Info
            </p>
            <p className="mb-1 flex gap-x-4 items-center">
              <div className="flex items-center gap-2">
                <p>Status: </p>
                <div className="flex items-center justify-start gap-1">
                  {getStatus}
                </div>
              </div>
              <div>
                <Menu
                  shadow="md"
                  position="top-start"
                  withArrow
                  arrowSize={12}
                  width={200}
                >
                  <Menu.Target>
                    <button className="text-blue-500">Change</button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Status</Menu.Label>
                    <Menu.Item
                      className="hover:bg-[#F5FAFF]"
                      leftSection={
                        <TbTruckDelivery className="text-green-500" />
                      }
                      onClick={() => onStatusChange("Delivered")}
                    >
                      Delivered
                    </Menu.Item>
                    <Menu.Item
                      className="hover:bg-[#F5FAFF]"
                      leftSection={<FcProcess />}
                      onClick={() => onStatusChange("Processing")}
                    >
                      Processing
                    </Menu.Item>
                    <Menu.Item
                      className="hover:bg-[#F5FAFF]"
                      leftSection={<VscError className="text-red-500" />}
                      onClick={() => onStatusChange("Failed")}
                    >
                      Failed
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </p>
          </div>

          <div className="col-span-2 flex justify-end gap-x-5">
            <button
              onClick={close}
              className="bg-white text-gray-800 border-[1.5px] border-gray-200 shadow-md rounded-sm text-xs py-2 px-6 "
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white shadow-md rounded-sm text-xs py-2 px-6 "
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>

      <FaEdit onClick={open} size={16} className="cursor-pointer" />
    </>
  );
}

export default EditTransactionModal;
