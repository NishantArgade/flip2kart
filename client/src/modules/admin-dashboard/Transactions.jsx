import { Menu, Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import DeletePopover from "../../components/DeletePopover"
import ClientFacingHeader from "./components/ClientFacingHeader"
import EditTransactionModal from "./components/EditTransactionModal"
import Table from "./components/Table"
import TableHeader from "./components/TableHeader"
import TableSearchBar from "./components/TableSearchBar"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    userId: "65a63a404e9ce490acd0c3a6",
    status: "Processing",
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
    status: "Failed",
    quantity: 30000,
    amount: 20000000,
    address:
      "pune, maharashtra, chakan pin 410501, near ganesh temple pune india",
    createdAt: new Date(),
  },
]

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("id", {
    header: (header) => <TableHeader header={header} name={"OrderID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("userId", {
    header: (header) => <TableHeader header={header} name={"UserID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("status", {
    header: (header) => <TableHeader header={header} name={"Status"} />,
    cell: (props) => (
      <p
        className={`${
          props.getValue() === "Processing"
            ? "text-blue-600"
            : props.getValue() === "Delivered"
              ? "text-green-600"
              : "text-red-600"
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
    cell: () => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <EditTransactionModal />
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

  return (
    <>
      <ClientFacingHeader
        heading={"Transactions"}
        subHeading={"Table for transactions"}
      />

      <div className=" w-full p-4 ">
        {/** Header */}
        {/** Header */}
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
                <p>Filter By Rating</p>
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
                }  hover:bg-[#F5FAFF] hover:text-blue-500`}
                onClick={() => onColumnFilterChange("status", "processing")}
              >
                Processing
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("4") && "bg-[#F5FAFF] text-green-500"
                }  hover:bg-[#F5FAFF] hover:text-green-500`}
                onClick={() => onColumnFilterChange("status", "delivered")}
              >
                Delivered
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("4") && "bg-[#F5FAFF] text-red-500"
                }  hover:bg-[#F5FAFF] hover:text-red-500`}
                onClick={() => onColumnFilterChange("status", "failed")}
              >
                Failed
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </section>

        {/** Table */}
        <Table
          data={data}
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
