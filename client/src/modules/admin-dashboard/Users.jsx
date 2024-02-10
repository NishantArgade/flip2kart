import { Menu, Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import DeletePopover from "../../components/DeletePopover"
import EditUserModal from "../../components/EditUserModal"
import ClientFacingHeader from "./components/ClientFacingHeader"
import Table from "./components/Table"
import TableHeader from "./components/TableHeader"
import TableSearchBar from "./components/TableSearchBar"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "admin",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "operator",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
  {
    id: "65a63a404e9ce490acd0c3a6",
    fristName: "Nishant",
    lastName: "Argade",
    email: "nishantargade4579@gmail.com",
    phone: 8007896396,
    gender: "male",
    address: "pune, maharashtra, india",
    createdAt: new Date("2023/01/10"),
    role: "user",
  },
]

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("id", {
    header: (header) => <TableHeader header={header} name={"UserID"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor((row) => `${row.fristName} ${row.lastName}`, {
    id: "fullName",
    header: (header) => <TableHeader header={header} name={"Name"} />,
    cell: (props) => (
      <Tooltip
        label={props.getValue()}
        arrowOffset={12}
        arrowSize={6}
        withArrow
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-14 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("email", {
    header: (header) => <TableHeader header={header} name={"Email"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
  }),

  colHelper.accessor("phone", {
    header: (header) => <TableHeader header={header} name={"Phone"} />,
    cell: (props) => <p className="mr-2">{props.getValue()}</p>,
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
        <p className="mr-2 w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("createdAt", {
    header: (header) => <TableHeader header={header} name={"CreatedAt"} />,
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
    // size: 500,
  }),

  colHelper.accessor("role", {
    header: (header) => <TableHeader header={header} name={"Role"} />,
    cell: (props) => (
      <p
        className={`${
          props.getValue() === "user" ? "text-green-500" : "text-orange-600"
        }  mr-2`}
      >
        {props.getValue()?.toLocaleString()}
      </p>
    ),
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <EditUserModal />
        <DeletePopover size={18} deleteItemName="user" />
      </p>
    ),
  }),
]

const Users = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([
    { id: "role", value: "" },
  ])

  const onColumnFilterChange = (role, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== role).concat({ id: role, value })
    )
  }

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "role").value || ""

  const isSelectedRating = (role) => role === filteredRatingValue

  return (
    <>
      <ClientFacingHeader heading={"Users"} subHeading={"Table for users"} />

      <div className="w-full p-4">
        {/** Header */}
        <section className="mb-6 flex flex-wrap  justify-end gap-8 md:justify-start">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search user by name, email, etc..."}
          />
          <Menu
            shadow="md"
            position="bottom-start"
            withArrow
            arrowSize={12}
            width={200}
            value="All"
          >
            <Menu.Target>
              <button className="flex items-center gap-x-2 text-xs text-blue-500">
                <FiFilter />
                <p>Filter By Role</p>
              </button>
            </Menu.Target>

            <Menu.Dropdown defaultValue="All">
              <Menu.Label>Roles</Menu.Label>
              <Menu.Item
                className={`${
                  isSelectedRating("") && "bg-[#F5FAFF] text-gray-700"
                }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                onClick={() => onColumnFilterChange("role", "")}
                value={"All"}
              >
                All
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("user") && "bg-[#F5FAFF] text-green-500"
                }  hover:bg-[#F5FAFF] hover:text-green-500`}
                onClick={() => onColumnFilterChange("role", "user")}
              >
                User
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("admin") && "bg-[#F5FAFF] text-orange-500"
                }  hover:bg-[#F5FAFF] hover:text-orange-500`}
                onClick={() => onColumnFilterChange("role", "admin")}
              >
                Admin
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </section>

        {/** Table */}
        <Table
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setColumnFilters={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default Users
