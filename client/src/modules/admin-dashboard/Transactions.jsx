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
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteOrder, getAllOrders } from "../../api/orderApi"
import Spinner from "../../components/Spinner"
import { queryClient } from "../../main"

const colHelper = createColumnHelper()

const Transactions = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([
    { id: "latest_order_status", value: "" },
  ])

  const { mutate, isPending } = useMutation({
    mutationKey: "deleteOrder",
    mutationFn: deleteOrder,
    onSuccess: () => queryClient.invalidateQueries("allOrders"),
  })

  const columns = [
    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"OrderID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("billing_user_id", {
      header: (header) => <TableHeader header={header} name={"UserID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("latest_order_status", {
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
          <DeletePopover
            size={18}
            deleteItemName="transaction"
            mutate={mutate}
            isPending={isPending}
            item={row.original}
          />
        </p>
      ),
    }),
  ]
  const onColumnFilterChange = (status, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== status).concat({ id: status, value })
    )
  }

  const filteredOrderStatusValue =
    columnFilters.find((f) => f.id === "latest_order_status").value || ""

  const isSelectedOrderStatus = (role) => role === filteredOrderStatusValue

  const { data, isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  })

  const finalData = useMemo(() => {
    const result = []
    data?.allOrders?.forEach((order) => {
      order.products.forEach((p) => {
        result.push({
          ...order,
          _id: order._id,
          billing_user_id: order.billing_user_id,
          latest_order_status: p.latest_order_status.status,
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

  return (
    <>
      {/** Header */}
      <ClientFacingHeader
        heading={"Transactions"}
        subHeading={"Table for transactions"}
      />

      {!isLoading ? (
        finalData?.length > 0 ? (
          <div className="p-4">
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
                    <div className="relative">
                      <div
                        className={`${isSelectedOrderStatus("") ? "hidden" : ""} absolute -left-0 -top-1 h-1 w-1 rounded-full bg-blue-500`}
                      ></div>
                      <FiFilter />
                    </div>
                    <p>Filter By Order Status</p>
                  </button>
                </Menu.Target>

                <Menu.Dropdown defaultValue="All">
                  <Menu.Label>Payment Status</Menu.Label>
                  <Menu.Item
                    className={`${
                      isSelectedOrderStatus("") && "bg-[#F5FAFF] text-gray-700"
                    }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                    onClick={() =>
                      onColumnFilterChange("latest_order_status", "")
                    }
                    value={"All"}
                  >
                    All
                  </Menu.Item>

                  <Menu.Item
                    className={`${
                      isSelectedOrderStatus("Order Confirmed") &&
                      "bg-[#F5FAFF] text-blue-500"
                    }  hover:bg-[#F5FAFF] hover:text-pink-500`}
                    onClick={() =>
                      onColumnFilterChange(
                        "latest_order_status",
                        "Order Confirmed"
                      )
                    }
                  >
                    Order Confirmed
                  </Menu.Item>
                  <Menu.Item
                    className={`${
                      isSelectedOrderStatus("Shipped") &&
                      "bg-[#F5FAFF] text-green-500"
                    }  hover:bg-[#F5FAFF] hover:text-blue-500`}
                    onClick={() =>
                      onColumnFilterChange("latest_order_status", "Shipped")
                    }
                  >
                    Shipped
                  </Menu.Item>
                  <Menu.Item
                    className={`${
                      isSelectedOrderStatus("Out for delivery") &&
                      "bg-[#F5FAFF] text-green-500"
                    }  hover:bg-[#F5FAFF] hover:text-orange-500`}
                    onClick={() =>
                      onColumnFilterChange(
                        "latest_order_status",
                        "Out for delivery"
                      )
                    }
                  >
                    Out for delivery
                  </Menu.Item>
                  <Menu.Item
                    className={`${
                      isSelectedOrderStatus("Delivered") &&
                      "bg-[#F5FAFF] text-red-500"
                    }  hover:bg-[#F5FAFF] hover:text-green-500`}
                    onClick={() =>
                      onColumnFilterChange("latest_order_status", "Delivered")
                    }
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
        ) : (
          <div className="flex  h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
            No Data Available
          </div>
        )
      ) : (
        <div className="flex h-[70vh] w-full items-center justify-center bg-white px-4">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Transactions
