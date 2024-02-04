import { Menu } from "@mantine/core"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import ClientFacingHeader from "../ClientFacingHeader"
import TableSearchBar from "../TableSearchBar"
import AdminTable from "./AdminTable"

const ManagingAdmin = () => {
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
      <ClientFacingHeader heading={"Admins"} subHeading={"Table for users"} />

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
                <FiFilter />
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
        <AdminTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default ManagingAdmin
