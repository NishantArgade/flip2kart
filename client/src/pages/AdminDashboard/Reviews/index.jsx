import { Menu } from "@mantine/core"
import { useState } from "react"
import { FiFilter } from "react-icons/fi"
import ClientFacingHeader from "../ClientFacingHeader"
import TableSearchBar from "../TableSearchBar"
import ReviewTable from "./ReviewTable"

const Reviews = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([
    { id: "rating", value: "" },
  ])

  const onColumnFilterChange = (rating, value) => {
    setColumnFilters((state) =>
      state.filter((f) => f.id !== rating).concat({ id: rating, value })
    )
  }

  const filteredRatingValue =
    columnFilters.find((f) => f.id === "rating").value || ""

  const isSelectedRating = (rating) => filteredRatingValue === rating

  return (
    <>
      <ClientFacingHeader
        heading={"Reviews"}
        subHeading={"Table for reviews"}
      />

      <div className="w-full p-4">
        {/** Header */}
        <section className="mb-6 flex flex-wrap  justify-end gap-8 md:justify-start">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search review by product name, user name, etc..."}
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
              <Menu.Label>Ratings</Menu.Label>
              <Menu.Item
                className={`${
                  isSelectedRating("") && "bg-[#F5FAFF] text-gray-700"
                }  hover:bg-[#F5FAFF] hover:text-gray-700`}
                onClick={() => onColumnFilterChange("rating", "")}
                value={"All"}
              >
                All
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("5") && "bg-[#F5FAFF] text-green-500"
                }  hover:bg-[#F5FAFF] hover:text-green-500`}
                onClick={() => onColumnFilterChange("rating", "5")}
              >
                5 Star
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("4") && "bg-[#F5FAFF] text-green-500"
                }  hover:bg-[#F5FAFF] hover:text-green-500`}
                onClick={() => onColumnFilterChange("rating", "4")}
              >
                4 Star
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("3") && "bg-[#F5FAFF]  text-orange-500"
                }  hover:bg-[#F5FAFF] hover:text-orange-500`}
                onClick={() => onColumnFilterChange("rating", "3")}
              >
                3 Star
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("2") && "bg-[#F5FAFF] text-orange-500"
                }  hover:bg-[#F5FAFF] hover:text-orange-500`}
                onClick={() => onColumnFilterChange("rating", "2")}
              >
                2 Star
              </Menu.Item>
              <Menu.Item
                className={`${
                  isSelectedRating("1") && "bg-[#F5FAFF] text-red-500"
                }  hover:bg-[#F5FAFF] hover:text-red-500`}
                onClick={() => onColumnFilterChange("rating", "1")}
              >
                1 Star
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </section>

        {/** Table */}
        <ReviewTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </>
  )
}

export default Reviews
