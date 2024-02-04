import { Menu } from "@mantine/core"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import ClientFacingHeader from "../ClientFacingHeader"
import TableSearchBar from "../TableSearchBar"
import TransactionTable from "./TransactionTable"

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
        <TransactionTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default Transactions
