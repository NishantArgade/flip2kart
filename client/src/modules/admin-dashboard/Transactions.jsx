import { Menu, Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useMemo, useState } from "react"
import { FiFilter } from "react-icons/fi"
import DeletePopover from "../../components/DeletePopover"
import ClientFacingHeader from "./components/ClientFacingHeader"
import EditTransactionModal from "./components/EditTransactionModal"
import Table from "./components/Table"
import TableHeader from "./components/TableHeader"
import TableSearchBar from "./components/TableSearchBar"
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "../../api/orderApi"

const data2 = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Order Confirmed",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Delivered",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Shipped",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Out for delivery",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
]

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("_id", {
    header: (header) => <TableHeader header={header} name={"OrderID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("billing_user_id", {
    header: (header) => <TableHeader header={header} name={"UserID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("order_status", {
    header: (header) => <TableHeader header={header} name={"Status"} />,
    cell: (props) => (
      <p
        className={`${
          props.getValue() === "Order Confirmed"
            ? "text-pink-600"
            : props.getValue() === "Shipped"
              ? "text-blue-600"
              : props.getValue() === "Out for delivery"
                ? "text-orange-600"
                : "text-green-600"
        }  mr-2`}
      >
        {props.getValue()}
      </p>
    ),
  }),

  colHelper.accessor("quantity", {
    header: (header) => <TableHeader header={header} name={"Quantity"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("amount", {
    header: (header) => <TableHeader header={header} name={"Amount"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    // size: 50,
  }),
  colHelper.accessor("address", {
    header: (header) => <TableHeader header={header} name={"Address"} />,
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-28 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("createdAt", {
    header: (header) => <TableHeader header={header} name={"CreatedAt"} />,
    cell: (props) => (
      <Tooltip
        label={moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-[4.5rem] truncate">
          {moment(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: ({ row }) => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <EditTransactionModal data={row.original} />
        <DeletePopover size={18} deleteItemName="transaction" />
      </p>
    ),
  }),
]
const Transactions = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([
    { id: "status", value: "" },
  ])

  const onColumnFilterChange = (role, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== role).concat({ id: role, value })
    )
  }

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "status").value || ""

  const isSelectedRating = (role) => role === filteredRatingValue

  const { data } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  })
  console.log(data?.allOrders)

  function getLastDeliveryStatus(order_status) {
    let latest_status = order_status[0]
    order_status.forEach((s) => {
      if (s.date > latest_status.date) {
        latest_status = s
      }
    })
    return latest_status
  }

  const finalData = useMemo(() => {
    const result = []
    data?.allOrders?.forEach((order) => {
      order.products.forEach((p) => {
        result.push({
          ...order,
          _id: order._id,
          billing_user_id: order.billing_user_id,
          order_status: getLastDeliveryStatus(p.order_status).status,
          quantity: p.quantity,
          amount: p.price - p.discount,
          address: order.shipping_address,
          createdAt: order.created_at,
          product: p,
        })
      })
    })
    return result
  }, [data?.allOrders])

  console.log(finalData)
  return (
    <>
      {/** Header */}
      <ClientFacingHeader
        heading={"Transactions"}
        subHeading={"Table for transactions"}
      />

      <div className=" w-full p-4 ">
        {/* Search Bar */}
        <section className="mb-6 flex flex-wrap  justify-end gap-8 md:justify-start">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search transaction by id, status, etc..."}
          />
          <Menu
            shadow="md"
            position="top-start"
            withArrow
            arrowSize={12}
            width={200}
            value="All"
          >
            <Menu.Target>
              <button className="flex items-center gap-x-2 text-xs text-blue-500">
                <FiFilter />
                <p>Filter By Order Status</p>
              </button>
            </Menu.Target>

            <Menu.Dropdown defaultValue="All">
              <Menu.Label>Payment Status</Menu.Label>
              <Menu.Item
                className={`${
                  isSelectedRating("") && "bg-[#F5FAFF] text-gray-700"
                }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                onClick={() => onColumnFilterChange("status", "")}
                value={"All"}
              >
                All
              </Menu.Item>

              <Menu.Item
                className={`${
                  isSelectedRating("5") && "bg-[#F5FAFF] text-blue-500"
                }  hover:bg-[#F5FAFF] hover:text-pink-500`}
                onClick={() =>
                  onColumnFilterChange("status", "Order Confirmed")
                }
              >
                Order Confirmed
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("4") && "bg-[#F5FAFF] text-green-500"
                }  hover:bg-[#F5FAFF] hover:text-blue-500`}
                onClick={() => onColumnFilterChange("status", "Shipped")}
              >
                Shipped
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("4") && "bg-[#F5FAFF] text-green-500"
                }  hover:bg-[#F5FAFF] hover:text-orange-500`}
                onClick={() =>
                  onColumnFilterChange("status", "Out for delivery")
                }
              >
                Out for delivery
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("4") && "bg-[#F5FAFF] text-red-500"
                }  hover:bg-[#F5FAFF] hover:text-green-500`}
                onClick={() => onColumnFilterChange("status", "Delivered")}
              >
                Delivered
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </section>

        {/** Table */}
        <Table
          data={finalData}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default Transactions
