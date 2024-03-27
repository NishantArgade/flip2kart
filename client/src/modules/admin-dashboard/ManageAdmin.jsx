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
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteUser, getAdmins } from "../../api/userApi"
import { queryClient } from "../../main"
import Spinner from "../../components/Spinner"

const ManageAdmin = () => {
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

  const { data, isLoading } = useQuery({
    queryKey: ["getAdmins"],
    queryFn: getAdmins,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers")
    },
    onError: (error) => console.log(error),
  })

  const colHelper = createColumnHelper()
  const columns = [
    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"Sr. No"} />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    }),

    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"UserID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor((row) => row, {
      id: "fullName",
      header: (header) => <TableHeader header={header} name={"Name"} />,
      cell: (props) => (
        <p className="mr-2">
          {props.getValue().first_name} {props.getValue().last_name}
        </p>
      ),
    }),

    colHelper.accessor("created_at", {
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

    colHelper.accessor("email", {
      header: (header) => <TableHeader header={header} name={"Email"} />,
      cell: (props) => (
        <p className="mr-2">{props.getValue() ? props.getValue() : "-"}</p>
      ),
    }),

    colHelper.accessor("phone", {
      header: (header) => <TableHeader header={header} name={"Phone"} />,
      cell: (props) => (
        <p className="mr-2">{props.getValue() ? props.getValue() : "-"}</p>
      ),
    }),

    colHelper.accessor("role", {
      header: (header) => <TableHeader header={header} name={"Role"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("action", {
      header: () => <p className="py-1 pb-5 text-xs text-gray-500">Action</p>,
      cell: ({ row }) => (
        <p className="flex  items-center justify-center gap-x-3 px-0 text-gray-500">
          <EditUserModal />
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

  return (
    <>
      <ClientFacingHeader heading={"Admins"} subHeading={"Table for users"} />

      {!isLoading ? (
        <div className="w-full p-4">
          {/** Header */}
          <section className="mb-6 flex flex-wrap  justify-end gap-8 md:justify-start">
            <TableSearchBar
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              placeholder={"Search by name, email, etc..."}
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
                  <div className="relative">
                    <div
                      className={`${isSelectedRating("") ? "hidden" : ""} absolute -left-0 -top-1 h-1 w-1 rounded-full bg-blue-500`}
                    ></div>
                    <FiFilter />
                  </div>
                  <p>Filter By Role</p>
                </button>
              </Menu.Target>

              <Menu.Dropdown defaultValue="All">
                <Menu.Label>Roles</Menu.Label>
                <Menu.Item
                  className={`${
                    isSelectedRating("") && "bg-[#F5FAFF] text-gray-600"
                  }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                  onClick={() => onColumnFilterChange("role", "")}
                  value={"All"}
                >
                  All
                </Menu.Item>

                <Menu.Item
                  className={`${
                    isSelectedRating("admin") && "bg-[#F5FAFF] text-gray-600"
                  }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                  onClick={() => onColumnFilterChange("role", "admin")}
                >
                  Admin
                </Menu.Item>
                <Menu.Item
                  className={`${
                    isSelectedRating("operator") && "bg-[#F5FAFF] text-gray-600"
                  }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                  onClick={() => onColumnFilterChange("role", "operator")}
                >
                  Operator
                </Menu.Item>
                <Menu.Item
                  className={`${
                    isSelectedRating("manager") && "bg-[#F5FAFF] text-gray-600"
                  }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                  onClick={() => onColumnFilterChange("role", "manager")}
                >
                  Manager
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </section>

          {/** Table */}
          <Table
            data={data?.admins}
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            columnFilters={columnFilters}
          />
        </div>
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default ManageAdmin
