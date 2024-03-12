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
import { getAddressString } from "../../utils/helper"
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteUser, getAllUsers } from "../../api/userApi"
import { useDisclosure } from "@mantine/hooks"
import { FaEdit } from "react-icons/fa"
import Spinner from "../../components/Spinner"
import { queryClient } from "../../main"

const colHelper = createColumnHelper()

const Users = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [selectedUser, setSelectedUser] = useState({})
  const [columnFilters, setColumnFilters] = useState([
    { id: "role", value: "" },
  ])

  const { data, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers")
    },
    onError: (error) => console.log(error),
  })

  const onColumnFilterChange = (role, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== role).concat({ id: role, value })
    )
  }

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "role").value || ""

  const isSelectedRating = (role) => role === filteredRatingValue
  const [opened, { open, close }] = useDisclosure(false)

  const columns = [
    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"UserID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
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

    colHelper.accessor("created_at", {
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
          {props.getValue()?.toLocaleString("en-IN")}
        </p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => null,
      cell: ({ row }) => (
        <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
          <button
            onClick={() => {
              setSelectedUser(row.original)
              open()
            }}
          >
            <FaEdit />
          </button>
          <DeletePopover
            size={18}
            deleteItemName="user"
            item={row.original}
            mutate={mutate}
            isPending={isPending}
          />
        </p>
      ),
    }),
  ]

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <>
      {selectedUser?._id && (
        <EditUserModal
          opened={opened}
          close={close}
          selectedUser={selectedUser}
        />
      )}
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
          data={data?.users || []}
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
