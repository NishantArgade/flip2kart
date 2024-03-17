import { Menu, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useMemo, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FcProcess } from "react-icons/fc"
import { TbTruckDelivery } from "react-icons/tb"
import { VscError } from "react-icons/vsc"
import { GiConfirmed } from "react-icons/gi"
import { FaBuildingCircleArrowRight } from "react-icons/fa6"
import { IoMdDoneAll } from "react-icons/io"
import moment from "moment"

function getLastDeliveryStatus(order_status) {
  let latest_status = order_status[0]
  order_status.forEach((s) => {
    if (s.date > latest_status.date) {
      latest_status = s
    }
  })
  return latest_status
}
function EditTransactionModal({ data }) {
  const [opened, { open, close }] = useDisclosure(false)
  const [status, setStatus] = useState("")

  const onStatusChange = (statusValue) => {
    setStatus(statusValue)
  }

  console.log(data)

  const getStatus = useMemo(() => {
    if (status === "Order Confirmed")
      return (
        <>
          <div className="flex items-center justify-center">
            <IoMdDoneAll size={17} className="text-green-500" />
          </div>
          <p>Order Confirmed</p>
        </>
      )
    else if (status === "Shipped")
      return (
        <>
          <div className="flex items-center justify-center">
            <FaBuildingCircleArrowRight className="text-blue-500" size={17} />
          </div>
          <p>Shipped</p>
        </>
      )
    else if (status === "Out for delivery")
      return (
        <>
          <div className="flex items-center justify-center">
            <TbTruckDelivery className="text-gray-500" size={17} />
          </div>
          <p>Out for delivery</p>
        </>
      )
    else if (status === "Delivered")
      return (
        <>
          <div className="flex items-center justify-center">
            <GiConfirmed className="text-green-500" size={17} />
          </div>
          <p>Delivered</p>
        </>
      )
    else return null
  }, [status])

  useEffect(() => {
    setStatus(getLastDeliveryStatus(data?.product?.order_status).status)
  }, [data])

  function handleClose() {
    close()
    setStatus(getLastDeliveryStatus(data?.product?.order_status).status)
  }

  return (
    <>
      <Modal
        size={800}
        opened={opened}
        onClose={handleClose}
        title="Manage Transaction"
        closeOnClickOutside={false}
        centered
      >
        <div className="grid grid-cols-2 gap-6">
          {/** User Info */}
          <div className="rounded-sm border-[1.5px] p-2 text-xs">
            <p className="mb-2 text-sm font-semibold text-gray-800">
              User Info
            </p>
            <p className="mb-1">
              <span>Name: </span>
              <span>{data?.billing_user}</span>
            </p>
            <p>
              <span>Address: </span>
              <span>{data?.shipping_address}</span>
            </p>
          </div>

          {/** Product Details */}
          <div className="rounded-sm border-[1.5px] p-2 text-xs">
            <p className="mb-2 text-sm font-semibold text-gray-800">
              Product Info
            </p>
            <p className="mb-1">
              <span>Product Name: </span>
              <span className="line-clamp-2">{data?.product?.name} </span>
            </p>
            <p>
              <span>Product ID: </span>
              <span>{data?.product?._id}</span>
            </p>
          </div>

          {/** Seller Info */}
          <div className="rounded-sm border-[1.5px] p-2 text-xs">
            <p className="mb-2 text-sm font-semibold text-gray-800">
              Seller Info
            </p>
            <p className="mb-1">
              <span>Seller Name: </span>
              <span>{data?.product?.seller} </span>
            </p>
            <p>
              <span>Seller Address: </span>
              <span>{data?.product?.seller_address}</span>
            </p>
          </div>

          {/** Amount Info */}
          <div className="rounded-sm border-[1.5px] p-2 text-xs">
            <p className="mb-2 text-sm font-semibold text-gray-800">
              Amount Info
            </p>
            <p className="mb-1">
              <span>Purchase Quantity: </span>
              <span>{data?.product?.quantity} </span>
            </p>
            <p>
              <span>Gross Amount: </span>
              <span>₹{data?.product?.price * data?.product?.quantity}</span>
            </p>

            <p>
              <span>Discount: </span>
              <span>₹{data?.product?.discount * data?.product?.quantity}</span>
            </p>
            <p>
              <span>Shipping Charges: </span>
              <span>₹{data?.shipping_charges * data?.product?.quantity}</span>
            </p>

            <p>
              <span>Packaging Charges: </span>
              <span>₹{data?.packing_charges}</span>
            </p>

            <p>
              <span>Final Amount: </span>
              <span>
                ₹
                {data?.product?.price * data?.product?.quantity -
                  data?.product?.discount * data?.product?.quantity +
                  data?.packing_charges +
                  data?.shipping_charges}
              </span>
            </p>
          </div>

          {/** Payment Info */}
          <div className="rounded-sm border-[1.5px] p-2 text-xs">
            <p className="mb-2 text-sm font-semibold text-gray-800">
              Payment Info
            </p>
            <p className="mb-1">
              <span>Payment Mode: </span>
              <span>{data?.payment?.method} </span>
            </p>
            <p className="mb-1">
              <span>Transaction ID: </span>
              <span>{data?.payment?.transaction_id}</span>
            </p>
            <p>
              <span>Transaction Date: </span>
              <span>
                {moment(data?.payment?.date).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </p>
          </div>

          {/** Status Info */}
          <div className="rounded-sm border-[1.5px] p-2 text-xs">
            <p className="mb-2 text-sm font-semibold text-gray-800">
              Status Info
            </p>
            <p className="mb-1 flex items-center gap-x-4">
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
                      leftSection={<IoMdDoneAll className="text-green-500" />}
                      onClick={() => onStatusChange("Order Confirmed")}
                    >
                      Order Confirmed
                    </Menu.Item>
                    <Menu.Item
                      className="hover:bg-[#F5FAFF]"
                      leftSection={
                        <FaBuildingCircleArrowRight className="text-blue-500" />
                      }
                      onClick={() => onStatusChange("Shipped")}
                    >
                      Shipped
                    </Menu.Item>
                    <Menu.Item
                      className="hover:bg-[#F5FAFF]"
                      leftSection={
                        <TbTruckDelivery className="text-gray-500" />
                      }
                      onClick={() => onStatusChange("Out for delivery")}
                    >
                      Out for delivery
                    </Menu.Item>
                    <Menu.Item
                      className="hover:bg-[#F5FAFF]"
                      leftSection={<GiConfirmed className="text-green-500" />}
                      onClick={() => onStatusChange("Delivered")}
                    >
                      Delivered
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </p>
          </div>

          <div className="col-span-2 flex justify-end gap-x-5">
            <button
              onClick={handleClose}
              className="rounded-sm border-[1.5px] border-gray-200 bg-white px-6 py-2 text-xs text-gray-800 shadow-md "
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="rounded-sm bg-blue-600 px-6 py-2 text-xs text-white shadow-md "
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>

      <FaEdit onClick={open} size={16} className="cursor-pointer" />
    </>
  )
}

export default EditTransactionModal
