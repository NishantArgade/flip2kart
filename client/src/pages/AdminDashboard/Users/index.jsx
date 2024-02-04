import { Menu } from "@mantine/core"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import ClientFacingHeader from "../ClientFacingHeader"
import TableSearchBar from "../TableSearchBar"
import UserTable from "./UserTable"

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
        <UserTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default Users
